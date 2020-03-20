import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    notifyList: JSON.parse(window.sessionStorage.getItem('notifyList')) || [],
    userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
  },
  mutations: {
    setCollapse(state, data) {
      state.isCollapse = data
    },
    setUserInfo(state, data) {
      state.userInfo = data
      window.sessionStorage.setItem('userInfo', JSON.stringify(data))
    },
    setNotifyList(state, data) {
      state.notifyList = data
      window.sessionStorage.setItem('notifyList', JSON.stringify(data))
    }
  },
  actions: {},
  modules: {}
})