import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchOptions: {
      zip: '',
      city: '',
      state: '',
      name: '',
      price: null,
    },
    favorites: []
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
    updateFavorites(state, payload) {
      state.favorites = payload
    }
  },
  actions: {
    clearNameSearch({commit}) {
      commit('clearNameSearch')
    },
    clearLocationSearch({commit}) {
      commit('clearLocationSearch')
    },
    setFavorites({commit}, payload) {
      commit('updateFavorites', payload)
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
    favorites(state) {
      return state.favorites
    }
  }
})
