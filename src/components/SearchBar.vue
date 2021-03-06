<template>
  <div class="search-bar--container">
    <div class="search-bar">
      <div class="search-bar--search-by icon icon--change" @click="changeSearchBy"></div>
      <div class="search-bar--by-name" :class="{active : searchBy === 'name'}">
        <div class="input--container icon icon--house" @input="clearLocationSearch()">
          <input class="input"  @keypress.enter="search" v-model="searchOptions.name" type="text" placeholder="Restaurant Name">
        </div>
      </div>

      <div class="search-bar--divider">
          or
      </div>

      <div class="search-bar--by-location" :class="{active : searchBy === 'location'}">  
        <div class="input--container icon icon--location zip-code"  @input="clearNameSearch">
          <input class="input" @keypress.enter="search" v-model="searchOptions.zip" type="number" placeholder="Zip Code">
        </div>

        <div class="input--container icon icon--location"  @input="clearNameSearch">
          <select class="input" v-model="searchOptions.city" :disabled="!cities.length">
            <option value=''>City</option>
            <option v-for="city in cities" :key="city" :value="city">{{city}}</option>
          </select>
        </div>

        <div class="input--container icon icon--location" @input="stateSelected">
          <select class="input" v-model="searchOptions.state">
            <option value=''>State</option>
            <option v-for="(stateName, stateAbrv) in states" :key="stateAbrv" :value="stateAbrv">{{stateName}}</option>
          </select>
        </div>
      </div>

      <button class="search-bar--search-button button" :class="{disabled : !searchIsValid}" @click="search">
        <span class="icon icon--search"></span>
        <span class="search-bar--search-button-text">Search</span>
      </button>

    </div>
    <div class="is-flex">
      <div class="search-bar--filters">
        <price-filter v-model="searchOptions.price" @search="search"/>
      </div>
      <span class="search-bar--total-results">{{totalResults}} results found</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PriceFilter from '@/components/PriceFilter'

export default {
  props: {
    totalResults: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchBy: 'location',
    }
  },
  computed: {
    ...mapGetters({
      searchOptions: 'search/searchOptions',
      cities: 'search/cities',
      states: 'search/states'
    }),
    searchIsValid() {
      const {zip, state, city, name} = this.searchOptions

      // Search query is valid, if any search params have a value
      return zip || state || city || name ? true : false
    },
  },
  methods: {
    ...mapActions({
      clearNameSearch: 'search/clearNameSearch',
      clearLocationSearch: 'search/clearLocationSearch',
      clearCitySearch: 'search/clearCitySearch'
    }),
    search() {
      // If search query is valid run search
      if (this.searchIsValid) {
        this.$emit('search')
      }
    },
    changeSearchBy() {
      this.searchBy = this.searchBy === 'location' ? 'name' : 'location'
    },
    stateSelected() {
      this.clearNameSearch()
      this.clearCitySearch()
    }
  },
  components: {
    PriceFilter
  },
}
</script>
