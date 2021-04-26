<!--
  - Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
  -->

<template>
  <v-list class="fullscreen-on leaflet-bar leaflet-control pa-0 mt-1" @click.stop.prevent="">
    <v-list-item class="pa-1 ma-0 map-icon-container" @click="clickFullscreen">
      <v-tooltip left class="right" z-index="25">
        <template v-slot:activator="{on}">
          <v-icon v-on="on" class="fullscreen-icon">mdi-fullscreen</v-icon>
        </template>
        <span>Fullscreen</span>
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
  }
};

export default {
  name: 'MapFullscreen',
  props: props,
  data() {
    return {
      fullScreen: false
    }
  },
  methods: {
    setFullScreen(fullScreen) {
      this.fullScreen = fullScreen;
    },
    onAdd() {
      return this.$el;
    },
    clickFullscreen() {
      if (this.fullScreen) {
        L.DomUtil.removeClass(this.$parent.$el, 'fullscreen-enabled');
        this.$parent.mapObject.invalidateSize();
        this.setFullScreen(false);
      } else {
        L.DomUtil.addClass(this.$parent.$el, 'fullscreen-enabled');
        this.$parent.mapObject.invalidateSize();
        this.setFullScreen(true);
      }
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

</style>
