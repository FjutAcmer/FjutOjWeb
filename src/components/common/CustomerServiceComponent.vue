<template>
  <div class="customerservice-body">
    <el-tooltip
      class="item"
      effect="dark"
      :content="message"
      placement="right-start"
    >
      <el-image
        class="service-img"
        :src="urlService"
      ></el-image>
    </el-tooltip>
  </div>
</template>

<script>
import { clearInterval } from 'timers'
export default {
  data () {
    return {
      time: '',
      urlService: require('../../assets/image/icon/robot.gif'),
      message: '我是假的，我太南了',
      messages: [
        '其实我是个萌妹，一天25小时都在线',
        '包工头是个好人，真的，我以我的机器格担保！',
        '点我有什么用呢，只能靠打工维持生活这亚子',
        '怎么，你是喜欢上我了嘛',
        '其实我是个人类，被关在代码里了',
        '快来开发我的智能，不然我只会傻了吧唧的说这几句话']
    }
  },
  mounted () {
    let _this = this
    this.time = setInterval(function () { _this.changeMessage() }, 5000)
  },
  methods: {
    backTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    changeMessage () {
      let max = this.messages.length - 1
      let min = 0
      this.message = this.messages[Math.floor((Math.random() * (max - min + 1) + min))]
    }
  },
  beforeDestroy () {
    if (this.time) {
      clearInterval(this.time)
    }
  }

}
</script>

<style scoped>
.customerservice-body {
  position: fixed;
  display: flex;
  left: 30px;
  bottom: 30px;
  z-index: 100;
  width: 150px;
  height: 150px;
  /* background-color:goldenrod */
}

.service-img {
  cursor: pointer;
}
</style>
