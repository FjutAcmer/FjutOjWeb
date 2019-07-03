<template>
  <div id="app" v-loading="loading">
    <Head style="position:fixed;top:0px;left:0px;z-index:10;"></Head>
    <div style="width:100%;background-color:#fafafa;margin-top:100px;">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from '@/components/common/Head'
import Foot from '@/components/common/Foot'

export default {
  name: 'App',
  components: {
    Head,
    // NewHead,
    Foot
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
