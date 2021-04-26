<!--
  - Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
  -->

<template>
  <l-map class="map" ref="map"
    :options="mapOptions"
    :zoom="zoom"
    :min-zoom="minZoom"
    :max-zoom="maxZoom"
    :crs="simpleCrs"
    @click="onClick">
    <l-control-zoom position="topright"/>
    <l-control-attribution position="bottomright"/>
    <map-fullscreen position="topright"/>
    <map-center position="topright" :bounds-geojson="boundsGeojson"/>
    <l-control-scale position="bottomleft" :imperial="false"/>
    <slot></slot>
  </l-map>
</template>

<script>
import * as L from 'leaflet';
import {LMap, LControlZoom, LControlAttribution, LControlScale} from 'vue2-leaflet';
import 'leaflet-imageoverlay-rotated';

import MapFullscreen from "@/components/MapFullscreen";
import MapCenter from "@/components/MapCenter";

const props = {
  boundsGeojson: {
    type: Object
  },
  centerOnGeojson: {
    type: Object,
    default: () => ({})
  },
  initialZoom: {
    type: Number,
    default: 1
  },
};

export default {
  name: 'MapContainerXY',
  components: {
    MapFullscreen,
    MapCenter,
    LMap,
    LControlZoom,
    LControlScale,
    LControlAttribution
  },
  props,
  data() {
    return {
      mapOptions: {
        zoomControl: false,
        attributionControl: false
      },
      zoom: 1,
      minZoom: 1,
      maxZoom: 30,
    };
  },
  computed: {
    simpleCrs() {
      return L.CRS.Simple;
    }
  },
  methods: {
    lmap() {
      return this.$refs.map.mapObject;
    },
    onClick(e) {
      console.log('X : ' + e.latlng.lng + ', Y : ' + e.latlng.lat);
    },
    goToCenterOnGeojson() {
      if (this.centerOnGeojson && this.centerOnGeojson.geometry) {
        const bounds = L.latLngBounds(this.centerOnGeojson.geometry.coordinates[0]
            .map(([lng, lat]) => {
              return {lat, lng};
            })
        );
        this.lmap().flyToBounds(bounds);
      }
    },
  },
  watch: {
    centerOnGeojson: {
      handler() {
        this.goToCenterOnGeojson();
      },
      deep: true
    }
  },
  mounted() {
    L.DomEvent.on(this.lmap(), this.$listeners);
    this.$refs.map.$el.oncontextmenu = e => {
      this.$emit('click-map', e);
      return false;
    };
  }
}

</script>

<style scoped lang="scss" type="text/scss">
  @import '../../node_modules/leaflet/dist/leaflet.css';

  .map {
    height: 100%;
  }
</style>

<style lang="scss" type="text/scss">
.leaflet-pane {
  z-index: 1;
}

.leaflet-top, .leaflet-right, .leaflet-bottom, .leaflet-left {
  z-index: 3;
}

.leaflet-control {
  z-index: 3;
}

.leaflet-touch .leaflet-bar a:not(.leaflet-control-fullscreen-button),
.leaflet-touch .leaflet-bar.ba-draw-controls a:not(.leaflet-control-fullscreen-button),
.leaflet-touch .leaflet-bar.ba-floor-switch a:not(.leaflet-control-fullscreen-button) {
  min-width: 30px;
  width: auto;
  background: inherit;
}

.leaflet-touch .leaflet-bar {
  background: white;
}

.theme--dark .leaflet-touch .leaflet-bar .leaflet-control-zoom-in,
.theme--dark .leaflet-touch .leaflet-bar .leaflet-control-zoom-out {
  background: #424242;
  color: white;
}

.fullscreen-enabled.leaflet-container {
  position: fixed !important;
  width: 100%;
  height: calc(100% - 26px);
  top: 0;
  left: 0;
  z-index: 99999;
}
</style>
