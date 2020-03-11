import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import store from '../store'
import { Loading } from 'element-ui'

Vue.use(Vuex)
Vue.use(Loading)

// 配置请求根路径
axios.defaults.baseURL = 'http://localhost:8888/api'

// 设置请求token
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })

// 配置loading
let loading

function statrLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

axios.interceptors.request.use(
  config => {
    statrLoading()
    try {
      const token = store.state.userInfo.token
      config.headers.common['token'] = token
    } catch (e) {
      console.log('用户暂未登录，获取token失败')
    }
    return config
  },
  error => {
    endLoading()
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  response => {
    endLoading()
    // 无权限，跳转到登陆页面
    if (response.data.code === 55555) {
      router.push('/login')
    }
    return response
  },
  error => {
    endLoading()
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axios
