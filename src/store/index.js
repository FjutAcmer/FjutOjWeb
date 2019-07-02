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
    index: '',
    unReadMsgCount: 0,
    token: '',
    // 测试
    myChartData: ''
  },
  mutations: {
    LOGOUT (state) {
      sessionStorage.clear()
      state.username = ''
      state.isLogin = false
      state.isAdmin = false
      state.isClockIn = false
      // state.index = ''
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
    setIndex (state, index) {
      state.index = index
    },
    setUnReadMsgCount (state, unReadMsgCount) {
      state.unReadMsgCount = unReadMsgCount
    }
  },
  actions,
  getters: {
    getUsername: state => state.username,
    getIsLogin: state => state.isLogin,
    getToken: state => state.token,
    getIsAdmin: state => state.isAdmin,
    getIsClockIn: state => state.isClockIn,
    getIndex: state => state.index,
    getUnReadMsgCount: state => state.unReadMsgCount
  }
})
