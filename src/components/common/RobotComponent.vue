<template>
  <div>
    <div class="customerservice-body">
      <el-popover
        class="item"
        :content="message"
        width="200"
        trigger="manual"
        placement="right-start"
        v-model="visiable"
      >
        <el-image
          slot="reference"
          ref="img"
          class="service-img"
          :src="urlService"
          @click="openDialog()"
        ></el-image>
        <el-button
          v-if="isTalking"
          type="warning"
          slot="reference"
          size="mini"
          @click="this.stopTalking"
        >“开始唠叨吧”</el-button>
        <el-button
          v-else
          type="warning"
          slot="reference"
          size="mini"
          @click="this.startTalking"
        >“我生气了”</el-button>
      </el-popover>
    </div>
    <el-dialog
      title="智能客服"
      width="60%"
      :visible.sync="dialogVisiable"
    >
      <iframe
        id="content"
        :src="this.src"
        width="100%"
        height="800px"
        frameborder="0"
        name="智能客服"
        scrolling="yes"
      >
      </iframe>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isTalking: true,
      visiable: false,
      dialogVisiable: false,
      time: '',
      src: '',
      urlService: require('../../assets/image/icon/robot.gif'),
      message: '我是假机器人，我叫敢敢',
      commonMessage: [
        '听说包工头是个憨憨，所以给我起名叫敢敢',
        '我的智能是假的啦，没钱做开发 :)',
        '听说你代码写的不错，来给我当包身工吧'
      ],
      notLoginMessages: [
        '今天敲代码了嘛？还不快登录我去做题？',
        '包工头喊你敲代码了，登录了就能看到！',
        '登录就送价值9999999金币的大礼包（并没有）',
        '我是个心碎了的憨憨，我叫敢敢'],
      notClockInMessages: [
        '今天还没签到，快快签到啦',
        '听说签到了会拿到几块AC币，真好',
        '今天有多少人做题了呢，敢敢还不知道呢？帮敢敢看下嘛',
        '我是个心碎了的憨憨，我叫敢敢']

    }
  },
  mounted () {
    let _this = this
    this.time = setInterval(function () { _this.changeMessage() }, 6000)
  },
  methods: {
    backTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    openDialog () {
      this.dialogVisiable = true
      let name = this.$route.name
      if (name === 'Home') {
        this.src = 'http://39.100.235.47:8888/index.html?token=%7B%22to%22%3A%22%23demohelp%22%2C%22from%22%3A%22carol%22%2C%22type%22%3A%22kefu%22%7D&msg=%22home%22&mode=kefu&res=fwh5_desktop'
      } else if (name === 'Contest' || name === 'ContestInfo') {
        this.src = 'http://39.100.235.47:8888/index.html?token=%7B%22to%22%3A%22%23demohelp%22%2C%22from%22%3A%22carol%22%2C%22type%22%3A%22kefu%22%7D&msg=%22rangegame%22&mode=kefu&res=fwh5_desktop'
      } else if (name === 'Problem') {
        this.src = 'http://39.100.235.47:8888/index.html?token=%7B%22to%22%3A%22%23demohelp%22%2C%22from%22%3A%22carol%22%2C%22type%22%3A%22kefu%22%7D&msg=%22subject%22&mode=kefu&res=fwh5_desktop'
      }
      console.log(document.getElementById('content'))
      document.getElementById('content').src = this.src
    },
    changeMessage () {
      if (!this.$store.getters.getIsLogin) {
        let max = this.notLoginMessages.length - 1
        let min = 0
        this.message = this.notLoginMessages[Math.floor((Math.random() * (max - min + 1) + min))]
      } else if (!this.$store.getters.getIsClockIn) {
        let max = this.notClockInMessages.length - 1
        let min = 0
        this.message = this.notClockInMessages[Math.floor((Math.random() * (max - min + 1) + min))]
      } else {
        let max = this.commonMessage.length - 1
        let min = 0
        this.message = this.commonMessage[Math.floor((Math.random() * (max - min + 1) + min))]
      }
      this.visiable = !this.visiable
      setTimeout(() => {
        this.visiable = !this.visiable
      }, 3000)
    },
    stopTalking () {
      this.urlService = require('../../assets/image/icon/robot_angry.jpg')
      this.message = '不听就算了，哼'
      this.visiable = true
      this.isTalking = false
      if (this.time) {
        clearInterval(this.time)
      }
      setTimeout(() => {
        this.visiable = false
      }, 2000)
    },
    startTalking () {
      this.message = '算你识相，哼'
      this.urlService = require('../../assets/image/icon/robot.gif')
      this.visiable = true
      this.isTalking = true
      let _this = this
      this.time = setInterval(function () { _this.changeMessage() }, 6000)
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
  left: 10px;
  bottom: 30px;
  z-index: 100;
  width: 150px;
  height: 180px;
}

.service-img {
  cursor: pointer;
  width: 100%;
  height: 90%;
}
</style>
