<!--
  - Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
  -->

<template>
  <v-container fluid fill-height>
    <map-container-x-y :center-on-geojson="centerOnGeojson" :bounds-geojson="floorImageGeojson">
      <occupancy-legend position="topright" :occupied-style="occupiedStyle" :empty-room-style="emptyRoomStyle"></occupancy-legend>
      <l-layer-group>
        <floor-plan-image url="/map_images/lab_occupancy_v3.png" :geoJson="floorImageGeojson"></floor-plan-image>
      </l-layer-group>
      <l-layer-group>
        <l-geo-json v-for="room in roomsGeojsonList" :key="room.id" :geojson="room"
                    :options="roomGeojsonOptions" @click="onRoomSelected(room)" @add="roomGeojsonLayerAdd" @remove="roomGeojsonLayerRemove"></l-geo-json>
      </l-layer-group>
      <sensor-reading-panel v-if="selectedRoom" :room="selectedRoom"
                            @close-sensor-panel="selectedRoom = null"></sensor-reading-panel>
    </map-container-x-y>
    <v-snackbar v-model="snackbar">
      There was a problem with connection to the data stream, please try again later.

      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>

import MapContainerXY from "@/components/MapContainerXY";
import FloorPlanImage from "@/components/FloorPlanImage";
import {LocationStore, findSensor, findRoomForSensor} from "@/components/LocationStore";
import {OccupancyLiveStream} from "@/components/OccupancyLiveStream";
import {formatDistanceToNow, differenceInSeconds} from "date-fns";
import _ from 'lodash';

import {
  LLayerGroup,
  LGeoJson
} from 'vue2-leaflet';
import SensorReadingPanel from "@/components/SensorReadingPanel";
import OccupancyLegend from "@/components/OccupancyLegend";

const props = {
  centerOnGeojson: {
    type: Object,
    default: () => ({})
  }
};

const sixteenHoursInSeconds = 16 * 60 * 60;
const hourInSeconds = 60 * 60;
const emptyAfterSeconds = 120;

export default {
  name: 'OccupancyMap',
  components: {
    OccupancyLegend,
    SensorReadingPanel,
    MapContainerXY,
    LLayerGroup,
    LGeoJson,
    FloorPlanImage
  },
  props,
  data: () => ({
    snackbar: false,
    locationData: null,
    selectedRoom: null,
    occupiedStyle: {
      color: '#ff8000',
      opacity: 0.0,
      fill: true,
      fillOpacity: 0.4,
      fillColor: '#ff8000'
    },
    emptyRoomStyle: {
      color: '#7fb24d',
      fill: true,
      opacity: 0.0,
      fillOpacity: 0.3,
      fillColor: '#7cfb4f'
    }
  }),
  computed: {
    floor() {
      return this.locationData.floors[0];
    },
    floorImageGeojson() {
      return this.floor.imageXyGeojson
    },
    roomsGeojsonList() {
      return this.floor.rooms.map(room => {
        const xyGeojson = room.xyGeojson;
        const presenceInTheRoom = room.roomSensors.some(s => s.sensor && s.sensor.presence);
        xyGeojson.properties.roomId = room.id;
        xyGeojson.properties.roomName = room.name;
        xyGeojson.properties.presence = presenceInTheRoom;
        return xyGeojson;
      });
    },
    roomGeojsonOptions() {
      return {
        style: this.emptyRoomStyle,
        onEachFeature(feature, layer) {
          if (feature.geometry.type === 'Polygon') {
            layer.bindTooltip(`<div class="room-tooltip">${feature.properties.roomName}</div>`, {direction: 'top'});
          }
        }
      }
    }
  },
  methods: {
    async consumeEvents(events) {
      for await (let event of events) {
        if (event.eventType === 'IOT_TELEMETRY') {
          findSensor(this.floor, event.iotTelemetry.deviceInfo.deviceMacAddress)
              .forEach(roomSensor => {
                if (!roomSensor.sensor) {
                  this.$set(roomSensor, 'sensor', {})
                }
                if (event.iotTelemetry.temperature && event.iotTelemetry.temperature.temperatureInCelsius) {
                  this.$set(roomSensor.sensor, 'temperatureInCelsius', event.iotTelemetry.temperature.temperatureInCelsius);
                }
                if (event.iotTelemetry.battery) {
                  this.$set(roomSensor.sensor, 'battery', event.iotTelemetry.battery.value);
                }
                const pirTrigger = event.iotTelemetry.pirTrigger;

                if (pirTrigger) {

                  let lastOccupancyInSeconds = differenceInSeconds(new Date(), new Date(pirTrigger.timestamp));

                  const newPresence = lastOccupancyInSeconds < emptyAfterSeconds;

                  //We will ignore reading from the past like 16 hours age, while previous record was 1 minute ago, we are ignoring this as invalid
                  if (lastOccupancyInSeconds > hourInSeconds && roomSensor.sensor.presenceTime > 0) {
                    console.log(`Ignoring high latency reading, lastPresence: ${roomSensor.sensor.presenceLabel}, while new value is: ${formatDistanceToNow(pirTrigger.timestamp)}`)
                    return;
                  }

                  this.$set(roomSensor.sensor, 'presenceTime', pirTrigger.timestamp);
                  const presenceChange = newPresence !== roomSensor.sensor.presence;
                  this.$set(roomSensor.sensor, 'presence', newPresence);

                  if (lastOccupancyInSeconds > sixteenHoursInSeconds) {
                    this.$set(roomSensor.sensor, 'presenceLabel', 'no data');
                  } else {
                    this.$set(roomSensor.sensor, 'presenceLabel', formatDistanceToNow(roomSensor.sensor.presenceTime, {includeSeconds: true}));
                  }

                  if (presenceChange) {
                    this.refreshRoomPresenceStyle(roomSensor);
                  }
                }

                console.log("Room sensor: %o, IoT Event: %o", roomSensor, event);
              });
        }
      }
    },
    handleConnectionError(error) {
      console.log(error);
      this.snackbar = true;
    },
    onRoomSelected(roomGeojson) {
      console.log('Room %o selected.', roomGeojson.properties.roomId);
      this.selectedRoom = this.floor.rooms.find(r => r.id === roomGeojson.properties.roomId);
    },
    refreshRoomPresenceStyle(roomSensor) {
      console.log('Room presence refresh on sensor change: %o', roomSensor);
      const roomGeojsonLayer = this.findRoomGeojsonLayer(roomSensor);
      console.log('Room GeoJSON layer found: %o', roomGeojsonLayer);
      if (roomGeojsonLayer) {
        this.roomOccupancyMapStyle(roomGeojsonLayer, roomSensor);
      }
    },
    findRoomGeojsonLayer(roomSensor) {
      const room = findRoomForSensor(this.floor, roomSensor.trackingId);
      console.log('Looking for Room GeoJSON layer for room: %o', room);
      return this.roomGeojsonLayers ? _.flatMap(this.roomGeojsonLayers, geojsonLayer => geojsonLayer.getLayers())
          .filter(layer => layer.feature.geometry.type === 'Polygon')
          .filter(layer => layer.feature.properties.roomId)
          .find(layer => layer.feature.properties.roomId === room.id) : null;
    },
    roomGeojsonLayerAdd(e) {
      console.log('Adding Room GeoJSON layer to map: %o', e);
      if (!this.roomGeojsonLayers) {
        this.roomGeojsonLayers = [];
      }
      this.roomGeojsonLayers.push(e.target);
    },
    roomGeojsonLayerRemove(e) {
      console.log('Removing Room GeoJSON layer from map: %o', e);
      if (this.roomGeojsonLayers) {
        _.remove(this.roomGeojsonLayers, layer => layer === e.target);
      }
    },

    roomOccupancyMapStyle(roomGeojsonLayer, roomSensor) {
      console.log('Styling room GeoJSON: %o', roomGeojsonLayer);
      if (roomSensor.sensor.presence === true) {
        roomGeojsonLayer.setStyle(this.occupiedStyle);
      } else {
        roomGeojsonLayer.setStyle(this.emptyRoomStyle);
      }
    }
  },
  created() {
    this.locationData = LocationStore;
  },
  mounted() {
    this.liveStream = new OccupancyLiveStream();
    this.liveStream.start()
        .then(events => this.consumeEvents(events))
        .catch(e => this.handleConnectionError(e));
  },
  destroyed() {
    this.liveStream.stop();
  }
}
</script>
