<template>
  <div class="restaurant">
    <div class="restaurant--image">
      <img :src="restaurant.image_url"/>
    </div>

    <div class="restaurant--left">
      <div class="restaurant--name">{{restaurant.name}}</div>
      <div class="restaurant--address icon icon--location">{{restaurant.address}} {{restaurant.city}}, {{restaurant.state}} {{restaurant.postal_code}}</div>
      <price-rating class="restaurant--price" :price="restaurant.price"/>
    </div>

    <div class="restaurant--right">
      <h3 class="restaurant--reservation-text">Make reservation</h3>
      <a class="button restaurant--reservation-button" :href="`tel:${restaurant.phone}`"><span class="icon icon--phone">{{restaurant.phone}}</span></a>
      <a class="restaurant--website" :href="restaurant.reserve_url">See Website</a>
      <span class="restaurant--save icon icon--heart">save</span>
    </div>
  </div>
</template>

<script>
import PriceRating  from '@/components/PriceRating'

export default {
  props: {
    restaurant: {
      type: Object,
      default() { 
        return {} 
      }
    }
  },
  components: {
    PriceRating
  }
}
</script>