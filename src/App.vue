<template>
  <div id="app">
    <top-nav/>
    <section class="app-body">
      <div class="alert">
        <p>Enjoy our discounts! Create an account <a href="">here.</a></p>

        <div class="icon icon--close"></div>
      </div>
      <search-bar @search="fetchRestuarants" ref="searchBar" :totalResults="pagination.total"/>

      <div class="restaurants-and-map" :style="{height: resultsHeight}">
        <div v-if="!loading && !restaurants.length">
          <h1>No results</h1>
          <h2>Please enter a new search</h2>
        </div>

        <div v-if="loading" class="icon icon--spinner loading"></div>

        <restaurants v-if="showResults" :restaurants="restaurants"/>

        <restaurant-map v-if="showResults" :restaurants="restaurants" :center="mapCenter"/>
      </div>

      <pagination :numberOfPages="numberOfPages" :currentPage="pagination.currentPage" @changePage="changePage" ref="pagination"/>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TopNav, SearchBar, Restaurants, RestaurantMap, Pagination } from '@/components'
import axios from 'axios'

export default {
  data() {
    return {
      restaurants: [],
      pagination: {
        currentPage: 0,
        per_page: 0,
        total: 0
      },
      loading: false,
      resultsHeight: 0,
    }
  },
  computed: {
    ...mapGetters({
      searchQuery: 'searchQuery'
    }),
    mapCenter() {
      return this.restaurants.length ? { lat: this.restaurants[0].lat, lng: this.restaurants[0].lng } : { lat: 0, lng: 0 }
    },
    numberOfPages() {
      return this.restaurants.length ? Math.ceil(this.pagination.total / this.pagination.per_page) : 0
    },
    showResults() {
      return !this.loading && this.restaurants.length
    }
  },
  mounted() {
    this.initBodyHight()
  },
  methods: {
    fetchRestuarants(page = 1) {
      // Set loading state
      this.loading = true

      // Fetch new data
      // We are only allowing results for the united states
      axios.get('http://opentable.herokuapp.com/api/restaurants?country=us&page=' + page + this.searchQuery)
        .then(response => {
          this.restaurants = response.data.restaurants

          this.pagination = {
            currentPage: parseInt(response.data.current_page),
            per_page: parseInt(response.data.per_page),
            total: parseInt(response.data.total_entries)
          }

          this.loading = false;
        })
        .catch(err => {
          this.restaurants = []

          this.pagination = {
            currentPage: 0,
            per_page: 0,
            total: 0
          }
          
          this.loading = false
        })
    },
    changePage(page) {
      this.fetchRestuarants(page)
    },
    // Methods for the results container hight
    initBodyHight() {
      window.addEventListener('resize', this.setSearchHeight)
      this.setResultsHeight()
    },
    setResultsHeight() {
      const negative = this.$refs.searchBar.$el.clientHeight  + this.$refs.pagination.$el.clientHeight
      this.resultsHeight = `calc(100% - ${negative}px)`
    },
  },
  components: {
    TopNav,
    SearchBar,
    Restaurants,
    RestaurantMap,
    Pagination
  }
}
</script>

