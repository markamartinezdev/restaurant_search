<template>
  <div class="restaurants-map">
    <l-map
      style="height: 100%; width: 100%"
      :zoom="zoom"
      :center="center"
      :zoomControl="false"
      ref='map'
      @ready="showAllMarkers"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-feature-group ref="markers">
        <l-marker :ref="restaurant.mls" v-for="(restaurant, index) in restaurants" :key="restaurant.id" :lat-lng="{lat:restaurant.lat, lng: restaurant.lng}">
          <l-icon>
            <span class="restaurants-map--marker icon icon--location-empty" :index="index + 1"></span>
          </l-icon>
        </l-marker>
      </l-feature-group>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LFeatureGroup, LIcon } from 'vue2-leaflet'

export default {
  props: {
    restaurants: {
      type: Array,
      default: () => []
    },
    initZoom: {
      type: Number,
      default: 6
    },
    zoomControl: {
      type: Boolean,
      default: true
    },
    center: {
      type: Object,
      default() {
        return {
          lat: 0,
          lng: 0
        }
      }
    }
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 15,
      bounds: []
    };
  },
  mounted() {
    this.zoomUpdated(this.initZoom)
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.$emit('centerUpdated', center)
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    },
    showAllMarkers() {
      const bounds = this.$refs.markers.mapObject.getBounds()
      this.$refs.map.mapObject.fitBounds(bounds)
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LFeatureGroup,
    LIcon
  },
}
</script>
