<template>
  <div class="restaurants">
    <restaurant v-for="(restaurant, index) in restaurants" :key="restaurant.id" :restaurant="restaurant" :index="index + 1"/>
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