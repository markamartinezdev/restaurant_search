import Vue from 'vue'
import App from './App.vue'
import store from './store'

import './leaflet'

// Changed the "s" to "S" since git wasnt registering the folder name change
import '@/Sass/app.scss'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
