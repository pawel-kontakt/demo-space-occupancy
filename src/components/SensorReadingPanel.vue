<!--
  - Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
  -->

<template>
  <v-card class="pa-0 leaflet-bar leaflet-control" @click.stop.prevent="" width="300">
    <v-card-title class="pb-0">
      <span class="secondary--text font-weight-bold">{{ room.name }}</span>
      <v-spacer></v-spacer>
      <v-btn class="float-right" text icon @click="$emit('close-sensor-panel')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-container class="overflow-y-auto fill-height">
      <v-row>
        <v-col>
          <v-card key="loader" class="ma-4" v-if="noData" flat>
            <div class="text-center primary--text font-italic">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <v-card-text class="text-center primary--text">
              Waiting for sensor data...
            </v-card-text>
          </v-card>
          <v-card key="presence" class="ma-4" v-if="presenceLabel">
            <v-toolbar color="#fbb64f" dark elevation="0">
              <v-card-title>
                <v-icon>mdi-walk</v-icon>
                <span class="title">Presence (PIR)</span>
              </v-card-title>
            </v-toolbar>
            <v-card-text class="headline font-weight-bold secondary--text">
              {{ presenceLabel }}
            </v-card-text>
          </v-card>
          <v-card key="temperature" class="ma-4" v-if="temperature">
            <v-toolbar color="#e9997e" dark elevation="0">
              <v-card-title>
                <v-icon>mdi-thermometer</v-icon>
                <span class="title">Temperature</span>
              </v-card-title>
            </v-toolbar>
            <v-card-text class="headline font-weight-bold secondary--text">
              {{ temperature.toFixed(2) }} °C
            </v-card-text>
          </v-card>
          <v-card key="battery" class="ma-4" v-if="battery">
            <v-toolbar color="#628ad9" dark elevation="0">
              <v-card-title>
                <v-icon>mdi-battery</v-icon>
                <span class="title">Battery</span>
              </v-card-title>
            </v-toolbar>
            <v-card-text class="headline font-weight-bold secondary--text">
              {{ battery }} %
            </v-card-text>
          </v-card>
        </v-col>
        </v-row>
      </v-container>
    </v-card>
</template>
<script>
import * as L from 'leaflet';

const props = {
  room: {
    type: Object,
    default: () => ({})
  }
};

export default {
  name: 'SensorReadingPanel',
  props,
  data() {
    return {
    }
  },
  computed: {
    noData() {
      return !this.presenceLabel && !this.temperature && !this.battery;
    },
    presenceLabel() {
      if (this.room && this.room.roomSensors) {
        const sensor = this.room.roomSensors.find(s => s.sensor && s.sensor.presenceLabel);
        if (sensor) {
          return sensor.sensor.presenceLabel;
        }
      }
      return null;
    },
    temperature() {
      if (this.room && this.room.roomSensors) {
        const sensor = this.room.roomSensors.find(r => r.sensor && r.sensor.temperatureInCelsius);
        if (sensor) {
          return sensor.sensor.temperatureInCelsius;
        }
      }
      return null;
    },
    battery() {
      if (this.room) {
        const sensor = this.room.roomSensors.find(r => r.sensor && r.sensor.battery);
        if (sensor) {
          return sensor.sensor.battery;
        }
      }
      return null;
    }
  },
  methods: {
    onAdd() {
      return this.$el;
    }
  },
  mounted() {
    const options = {
      position: 'topleft'
    };
    this.mapObject = new L.Control(options);
    this.mapObject.onAdd = this.onAdd;
    this.mapObject.addTo(this.$parent.mapObject);
  },
  beforeDestroy() {
    this.mapObject.remove();
  },
  watch: {
  }
};
</script>
<style scoped lang="scss" type="text/scss">
.scroll-y-auto {
  overflow-y: auto;
}
</style>
