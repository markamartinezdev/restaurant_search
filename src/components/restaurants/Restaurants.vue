<template>
  <div class="restaurants">
    <restaurant v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant" />
  </div>
</template>

<script>
import Restaurant from './Restaurant'

export default {
  props: {
    restaurants: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Restaurant
  }
}
</script>