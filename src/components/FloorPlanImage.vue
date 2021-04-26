<!--
  - Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
  -->

<script>
import * as L from 'leaflet';
import {findRealParent} from 'vue2-leaflet';
import 'leaflet-imageoverlay-rotated';

const props = {
  geoJson: {
    type: Object,
    required: true
  },
  opacity: {
    type: Number,
    default: 1.0,
  },
  crossOrigin: {
    type: Boolean,
    default: false,
  },
  visible: {
    type: Boolean,
    custom: true,
    default: true,
  },
  url: {
    type: String,
    required: true
  }
};

export default {
  name: 'FloorPlanImage',
  props,
  data() {
    return {
      parentContainer: null
    }
  },
  computed: {
    topleft() {
      const coord = this.geoJson.geometry.coordinates[0][0];
      return [coord[1], coord[0]];
    },
    topright() {
      const coord = this.geoJson.geometry.coordinates[0][1];
      return [coord[1], coord[0]];
    },
    bottomleft() {
      const coord = this.geoJson.geometry.coordinates[0][3];
      return [coord[1], coord[0]];
    },
    reposition() {
      return [this.topleft, this.topright, this.bottomleft];
    }
  },
  watch: {
    reposition: function() {
      this.mapObject.reposition(this.topleft, this.topright, this.bottomleft);
    }
  },
  mounted() {
    const options = {
      opacity: this.opacity,
      crossOrigin: this.crossOrigin,
    };
    this.mapObject = L.imageOverlay.rotated(this.url, this.topleft, this.topright, this.bottomleft, options);

    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.addLayer(this, !this.visible);
  },
  beforeDestroy() {
    if (this.parentContainer) {
      this.parentContainer.removeLayer(this);
    }
  },
  render() {
    return null;
  }
}
</script>

<style scoped lang="scss" type="text/scss">
</style>
