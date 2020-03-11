import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/axios.js'
import Header from './components/Header'
import LeftMenu from './components/LeftMenu'

Vue.config.productionTip = false

Vue.component('Header', Header)
Vue.component('LeftMenu', LeftMenu)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
