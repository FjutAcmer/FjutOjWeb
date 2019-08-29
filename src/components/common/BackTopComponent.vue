<template>
  <div
    class="scrollTop"
    v-show="showTop"
    @click="toTop"
  >
    <el-image :src="require('../../assets/image/icon/back_top.png')" />
  </div>
</template>

<script>
export default {
  name: 'scroll-top',
  data () {
    return {
      scrollTop: 0,
      time: 0,
      dParams: 20,
      scrollState: 0
    }
  },
  computed: {
    showTop: function () {
      let value = this.scrollTop > 300
      return value
    }
  },
  mounted () {
    window.addEventListener('scroll', this.getScrollTop)
  },
  methods: {
    toTop (e) {
      if (this.scrollState) {
        return
      }
      this.scrollState = 1
      e.preventDefault()
      // let distance = document.documentElement.scrollTop || document.body.scrollTop
      let _this = this
      this.time = setInterval(function () { _this.gotoTop(_this.scrollTop - _this.dParams) }, 10)
    },
    gotoTop (distance) {
      this.dParams += 20
      distance = distance > 0 ? distance : 0
      document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance
      if (this.scrollTop < 10) {
        clearInterval(this.time)
        this.dParams = 20
        this.scrollState = 0
      }
    },
    getScrollTop () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    }
  }

}
</script>

<style scoped>
.scrollTop {
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>
