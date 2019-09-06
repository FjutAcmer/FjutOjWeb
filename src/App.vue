<template>
  <div
    id="app"
    v-loading="loading"
  >

    <Head class="header"></Head>
    <Robot></Robot>

    <div class="main">
      <transition
        name="fade"
        mode="out-in"
      >
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
          </router-view>
        </keep-alive>
      </transition>
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </transition>
    </div>
    <BackTop></BackTop>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '@/components/common/HeadComponent'
import Foot from '@/components/common/FootComponent'
import Robot from '@/components/common/RobotComponent'
import BackTop from './components/common/BackTopComponent'

export default {
  name: 'App',
  components: {
    Head,
    Foot,
    Robot,
    BackTop
  },
  data () {
    return {
      loading: false

    }
  },
  created () {
    // add by axiang [20190612] 每次刷新时，将sessionStorge内的内容还原到store内，解决刷新后数据丢失的问题
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }
    // add by axiang [20190612] 页面刷新后store内容会清空，这里在页面刷新前将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  methods: {

  },
  // 自定义指令
  directives: {

  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  padding: 0;
  margin: 0;
  position: relative;
  background-color: #fafafa;
  min-height: 600px;
}

.header {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
}

.main {
  width: 100%;
  background-color: #fafafa;
  min-height: 650px;
  margin-top: 80px;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s;
}
</style>
