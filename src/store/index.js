import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'

Vue.use(Vuex)
// add by axiang [20190611] 增加store存储状态
export default new Vuex.Store({
  state: {
    username: '',
    isLogin: false,
    isAdmin: false,
    isClockIn: false,
    token: ''
  },
  mutations: {
    LOGOUT (state) {
      sessionStorage.clear()
      state.username = ''
      state.isLogin = false
      state.isAdmin = false
      state.isClockIn = false
      state.token = ''
    },
    setUsername (state, username) {
      state.username = username
    },
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
    },
    setIsAdmin (state, isAdmin) {
      state.isAdmin = isAdmin
    },
    setIsClockIn (state, isClockIn) {
      state.isClockIn = isClockIn
    }
  },
  actions,
  getters: {
    getUsername: state => state.username,
    getIsLogin: state => state.isLogin,
    getToken: state => state.token,
    getIsAdmin: state => state.isAdmin,
    getIsClockIn: state => state.isClockIn
  }
})
