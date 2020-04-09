import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import store from '../store'
import {
  Loading,
  Message
} from 'element-ui'


// 配置请求根路径
// axios.defaults.baseURL = 'http://localhost:8888/api'
axios.defaults.baseURL = 'https://api.hooya.top:8080/api'

// 配置loading
let loading

function statrLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.5)'
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
      Message.warning(response.data.message)
      router.push('/login')
    } else if (response.data.code === 10001) { // 参数绑定错误
      Message.warning(response.data.data)
    } else if (response.data.code === 99999) { //其他错误
      Message.warning(response.data.message)
    }
    return response
  },
  error => {
    endLoading()
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axios