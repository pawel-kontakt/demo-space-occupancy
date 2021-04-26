<!--
  - Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
  -->

<template>
  <v-list class="center-on leaflet-bar leaflet-control" @click.stop.prevent="">
    <v-list-item class="ma-0">
      <div class="mx-1" :style="occupiedRoomStyleCss">&nbsp;</div>
      <span class="mr-1">Occupied</span>
    </v-list-item>
    <v-list-item class="ma-0" @click="center">
      <div class="mx-1" :style="emptyRoomStyleCss">&nbsp;</div>
      <span class="mr-1">Empty</span>
    </v-list-item>
  </v-list>
</template>
<script>
import * as L from 'leaflet';

const props = {
  emptyRoomStyle: {
    type: Object
  },
  occupiedStyle: {
    type: Object
  }
};

export default {
  name: 'OccupancyLegend',
  props,
  data() {
    return {
    }
  },
  methods: {
    onAdd() {
      return this.$el;
    },
    legendStyle(style) {
      return {
        height: '1rem',
        width: '1rem',
        backgroundColor: style.fillColor,
        opacity: style.fillOpacity,
        border: `3xp solid ${style.color}`,
        borderRadius: '4px'
      }
    }
  },
  computed: {
    emptyRoomStyleCss() {
      return this.legendStyle(this.emptyRoomStyle);
    },
    occupiedRoomStyleCss() {
      return this.legendStyle(this.occupiedStyle);
    }
  },
  mounted() {
    const options = {
      position: 'bottomright'
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
<style scoped lang="scss" type="text/scss">
</style>
