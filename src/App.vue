<template>
  <div id="app" v-loading="loading">
    <Head></Head>
    <div style="width:100%;background-color:#fafafa">
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
  components:{
    Head,Foot
  },data(){
    return {
      loading:false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  padding: 0;
  margin: 0;
  position: relative;
  background-color:#fafafa;
  min-height: 600px;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .5s;
}

.fade-leave {
  opacity: 1;
}

.fade-leave-active{
  opacity: 0;
  transition: opacity .5s;
}
</style>
