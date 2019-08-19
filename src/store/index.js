import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// add by axiang [20190611] 添加store存储状态
export default new Vuex.Store({
  state: {
    username: '',
    isLogin: false,
    isAdmin: false,
    isClockIn: false,
    index: '',
    unReadMsgCount: 0,
    token: ''
  },
  mutations: {
    LOGOUT (state) {
      sessionStorage.clear()
      state.username = ''
      state.isLogin = false
      state.isAdmin = false
      state.isClockIn = false
      state.unReadMsgCount = 0
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
    },
    setUnReadMsgCount (state, unReadMsgCount) {
      state.unReadMsgCount = unReadMsgCount
    },
    setToken (state, token) {
      state.token = token
    }
  },
  getters: {
    getUsername: state => state.username,
    getIsLogin: state => state.isLogin,
    getIsAdmin: state => state.isAdmin,
    getIsClockIn: state => state.isClockIn,
    getUnReadMsgCount: state => state.unReadMsgCount,
    getToken: state => state.token
  }
})
