<template>
  <div class="search-bar--filter" ref='filter'>
    <div class="search-bar--filter-label"  @click="toggleFilter">Price</div>

    <div v-show="showFilter" class="search-bar--filter-options">
      <div @click="updatePriceFilter()" class="search-bar--filter-option">Any</div>
      <price-rating @click="updatePriceFilter(1)" class="search-bar--filter-option" :price="1"/>
      <price-rating @click="updatePriceFilter(2)" class="search-bar--filter-option" :price="2"/>
      <price-rating @click="updatePriceFilter(3)" class="search-bar--filter-option" :price="3"/>
      <price-rating @click="updatePriceFilter(4)" class="search-bar--filter-option" :price="4"/>
    </div>
  </div>
</template>

<script>
import PriceRating from '@/components/restaurants/PriceRating'
export default {
  data() {
    return {
      showFilter: false,
    }
  },
  methods: {
    updatePriceFilter(price = '') {
      this.$emit('input',price)
      this.toggleFilter()
      this.$emit('search')
    },
    toggleFilter(e) {
      if (this.showFilter) {
        document.removeEventListener('click', this.checkForClick)
      }
      else {
        document.addEventListener('click', this.checkForClick)
      }
      this.showFilter = !this.showFilter
    },
    checkForClick(e) {
      const containsTarget = this.$refs.filter.contains(e.srcElement)

      if (!containsTarget) {
        this.toggleFilter()
      }
    }
  },
  components: {
    PriceRating
  }
}
</script>