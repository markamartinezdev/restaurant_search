export default {
  state: {
    favorites: []
  },
  mutations: {
    updateFavorites(state, payload) {
      state.favorites = payload
    }
  },
  actions: {
    setFavorites({commit}, payload) {
      commit('updateFavorites', payload)
    }
  },
  getters: {
    favorites(state) {
      return state.favorites
    }
  },
  namespaced: true
}