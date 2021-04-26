<!--
  - Copyright (c) 2021. Kontakt.io Inc. See LICENSE file.
  -->

<template>
  <v-app>
    <v-app-bar app clipped-left>
      <div class="d-flex align-center">
<!--        <v-img-->
<!--          alt="CISCO DNA Spaces"-->
<!--          class="shrink mr-2"-->
<!--          contain-->
<!--          src="./assets/logo.svg"-->
<!--          transition="scale-transition"-->
<!--          min-width="240"-->
<!--          width="240"-->
<!--        />-->

        <span class="text-lg-h5 secondary--text">Space Occupancy Analytics</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://dnaspaces.io" target="_blank" text color="primary">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app color="primary" dark clipped>
      <v-list nav>
        <v-list-item link v-for="zone in locationData.zones" :key="zone.name" @click="centerOnGeojson = zone.xyGeojson">
          <v-list-item-icon>
            <v-icon>{{ zone.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ zone.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <OccupancyMap :center-on-geojson="centerOnGeojson"/>
    </v-main>

    <v-footer padless>
      <v-col class="text-center" cols="12">Made with 💗 by Kontakt.io Inc. {{ new Date().getFullYear() }}</v-col>
    </v-footer>
  </v-app>
</template>

<script>
import OccupancyMap from '@/components/OccupancyMap';
import {LocationStore} from "@/components/LocationStore";

export default {
  name: 'App',
  components: {
    OccupancyMap,
  },
  data: () => ({
    locationData: null,
    centerOnGeojson: null,
  }),
  created() {
    this.locationData = LocationStore;
    this.centerOnGeojson = this.locationData.floors[0].xyGeojson;
  }
};
</script>
<style lang="scss">
.map-container {
  min-height: 80vh;
  position: sticky;
  top: 9.5rem;
  z-index: 3;
}
.static-container {
  position: static;
}
.full-screen-container {
  position: static;
  z-index: auto;
}

</style>
