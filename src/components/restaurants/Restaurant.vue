<template>
  <div class="restaurant">
    <div class="restaurant--image">
      <img :src="restaurant.image_url"/>
    </div>

    <div class="restaurant--left">
      <div class="restaurant--name">{{restaurant.name}}</div>
      <div class="restaurant--index">#{{index}}</div>
      <div class="restaurant--address icon icon--location">{{restaurant.address}} {{restaurant.city}}, {{restaurant.state}} {{restaurant.postal_code}}</div>
      <price-rating class="restaurant--price" :price="restaurant.price"/>
    </div>

    <div class="restaurant--right">
      <h3 class="restaurant--reservation-text">Make reservation</h3>
      <a class="button restaurant--reservation-button" :href="`tel:${restaurant.phone}`"><span class="icon icon--phone">{{restaurant.phone}}</span></a>
      <div class="is-flex">
        <a class="restaurant--website" :href="restaurant.reserve_url">See Website</a>
        <span class="restaurant--save icon" :class="`icon--heart${isFavorite ? '-filled' : ''}`" @click="toggleFavorite(restaurant.id)">save</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex' 
import PriceRating  from '@/components/PriceRating'

export default {
  props: {
    restaurant: {
      type: Object,
      default() { 
        return {} 
      }
    },
    index: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapGetters({
      favorites: 'favorites/favorites'
    }),
    isFavorite() { 
      return this.favorites.includes(this.restaurant.id)
    }
  },
  methods: {
    ...mapActions({
      setFavorites: 'favorites/setFavorites'
    }),
    toggleFavorite(){
      this.isFavorite ? this.removeFavorite() : this.addFavorite()
    },
    removeFavorite() {
      const favorites = this.favorites.filter(favorite => { return favorite !==this.restaurant.id })
      this.setFavorites(favorites)
    },
    addFavorite() {
      this.favorites.push(this.restaurant.id)
      this.setFavorites(this.favorites)
    },
  },
  components: {
    PriceRating
  }
}
</script>