import Cities from '@/static_data/US_States_and_Cities'

export default {
  state: {
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
  },
  mutations: {
    clearNameSearch(state) {
      state.searchOptions.name = ''
    },
    clearLocationSearch(state) {
      state.searchOptions.zip = ''
      state.searchOptions.city = ''
      state.searchOptions.state = ''
    },
    clearCitySearch(state) {
      state.searchOptions.city = ''
    }
  },
  actions: {
    clearNameSearch({commit}) {
      commit('clearNameSearch')
    },
    clearLocationSearch({commit}) {
      commit('clearLocationSearch')
    },
    clearCitySearch({commit}){
      commit('clearCitySearch')
    }
  },
  getters: {
    searchOptions(state) {
      return state.searchOptions
    },
    searchQuery(state) {
      let query = ''

      // Array with the properties in searchOptions
      const properties = Object.keys(state.searchOptions)

      for (let property of properties) {
        // If the property has a value add it to the query string
        if (state.searchOptions[property]) {
          query = query + `&${property}=${state.searchOptions[property]}`
        }
      }

      return query
    },
    states(state) {
      return state.states
    },
    cities(state) {
      return state.searchOptions.state ? Cities[state.states[state.searchOptions.state]] : []
    }
  },
  namespaced: true
}