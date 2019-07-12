<template>
  <div class="index-body">
    <div class="header-announcement"><Carousel></Carousel></div>
    <div class="home-info-body"><HomeInfo></HomeInfo></div>
    <div class="border-body"><Border></Border></div>
  </div>
</template>

<script>
import Carousel from '@/components/common/CarouselGraph'
import HomeInfo from '@/components/common/HomeInfo'
import Border from '@/components/common/Border'

export default {
  components: {
    Carousel,
    HomeInfo,
    Border
  }

}
</script>

<style>
.index-body {
  margin: auto;
  width: 90%;
  min-height: 800px;
}

.header-announcement {
  width: 900px;
  margin: auto;
}

.home-info-body{
  float: left;
  margin-bottom: 30px;
  width: 950px;
}

.border-body{
  float: left;
  width: 330px;
  margin-left: 30px;
  min-height: 400px;
}
</style>
