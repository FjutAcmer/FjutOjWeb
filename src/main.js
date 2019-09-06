// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/docco.css'
import store from './store/index'
import logger from './util/logger.js'
import http from './api/http.js'

import ace from 'ace-builds'

import './assets/css/global.css'
import './assets/css/elcard.css'
import './assets/css/elcollapse.css'
import './assets/css/rank.css'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(ElementUI)
Vue.use(VueHighlightJS)
Vue.use(ace)
// Vue.use(VueQuillEditor)
Vue.prototype.logger = logger
Vue.prototype.$http = http

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
