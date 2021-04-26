<!--
  - Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
  -->

<template>
  <v-list class="center-on leaflet-bar leaflet-control pa-0 mt-1" @click.stop.prevent="">
    <v-list-item class="pa-1 ma-0 map-icon-container" @click="center">
      <v-tooltip left class="right" z-index="25">
        <template v-slot:activator="{on}">
          <v-icon v-on="on" class="center-icon">mdi-target</v-icon>
        </template>
        <span>Center on the Floor</span>
      </v-tooltip>
    </v-list-item>
  </v-list>
</template>
<script>
import * as L from 'leaflet';

const props = {
  position: {
    type: String,
    default: 'topleft'
  },
  options: {
    type: Object,
    default: () => ({})
  },
  boundsGeojson: {
    type: Object
  }
};

export default {
  name: 'MapCenter',
  props: props,
  methods: {
    onAdd() {
      return this.$el;
    },
    center() {
      if (this.boundsGeojson && this.boundsGeojson.geometry) {
        const bounds = L.latLngBounds(this.boundsGeojson.geometry.coordinates[0]
            .map(([lng, lat]) => {
              return {lat, lng};
            })
        );
        this.$parent.mapObject.flyToBounds(bounds);
      }
    },
  },
  watch: {
    boundsGeojson: {
      handler() {
        this.center();
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    const options = {
      position: this.position
    };

    this.mapObject = new L.Control(options);
    this.mapObject.onAdd = this.onAdd;
    this.mapObject.addTo(this.$parent.mapObject);
  },
  beforeDestroy() {
    this.mapObject.remove();
  }
};
</script>
<style lang="scss" type="text/scss">
.v-list .v-input--selection-controls .v-input__slot {
  margin-bottom: 0;
}
.v-list .v-list__tile .v-tooltip {
  z-index: 9999;
}

.center-on ::v-deep .v-list__tile {
  outline: none;
  margin: 0;
  padding: 0;
}
</style>
