<template>
  <div class="search-bar--container">
    <div class="search-bar">
      <div class="search-bar--by-name">
        <div class="input--container icon icon--house" @input="clearLocationSearch()">
          <input class="input"  @keypress.enter="search" v-model="searchOptions.name" type="text" placeholder="Restaurant Name">
        </div>
      </div>

      <div class="search-bar--divider">
          or
      </div>

      <div class="search-bar--by-location">  
        <div class="input--container icon icon--location zip-code"  @input="clearNameSearch()">
          <input class="input" @keypress.enter="search" v-model="searchOptions.zip" type="number" placeholder="Zip Code">
        </div>

        <div class="input--container icon icon--location"  @input="clearNameSearch()">
          <input class="input" @keypress.enter="search" v-model="searchOptions.city" type="text" placeholder="City">
        </div>

        <div class="input--container icon icon--location" @input="clearNameSearch()">
          <select class="input" v-model="searchOptions.state">
            <option value=''>State</option>
            <option v-for="(stateName, stateAbrv) in states" :key="stateAbrv" :value="stateAbrv">{{stateName}}</option>
          </select>
        </div>
      </div>

      <button class="search-bar--search-button button" :class="{disabled : !searchIsValid}" @click="search"><span class="icon icon--search">Search</span></button>

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
import PriceFilter from "./PriceFilter"

export default {
  props: {
    totalResults: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchOptions: {
        zip: '',
        city: '',
        state: '',
        name: '',
        price: null,
      },
      states: {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
      },
    }
  },
  computed: {
    searchQuery() {
      let query = ''

      // Array with the properties in searchOptions
      const properties = Object.keys(this.searchOptions)

      for (let property of properties) {
        // If the property has a value add it to the query string
        if (this.searchOptions[property]) {
          query = query + `&${property}=${this.searchOptions[property]}`
        }
      }

      return query
    },
    searchIsValid() {
      const {zip, state, city, name} = this.searchOptions

      // Search query is valid, if any search params have a value
      return zip || state || city || name ? true : false
    }
  },
  methods: {
    search() {
      // If search query is valid run search
      if (this.searchIsValid) {
        this.$emit('search', this.searchQuery)
      }
    },
    clearNameSearch() {
      this.searchOptions.name = ''
    },
    clearLocationSearch() {
      this.searchOptions.zip = ''
      this.searchOptions.city = ''
      this.searchOptions.state = ''
    },
  },
  components: {
    PriceFilter
  },
}
</script>
