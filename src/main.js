import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/axios.js'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/legend'
import Header from './components/Header'
import LeftMenu from './components/LeftMenu'

Vue.config.productionTip = false

Vue.component('Header', Header)
Vue.component('LeftMenu', LeftMenu)
Vue.component('ECharts', ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')