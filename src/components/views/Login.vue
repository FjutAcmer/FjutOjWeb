<template>
  <div class="login">
    <el-card
      :body-style="{ padding: '0px' }"
      class="box-card"
    >
      <el-image :src="picUrl" class="img"></el-image>
      <div class="login-box">
        <h1>登录</h1>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
        >
          <el-form-item prop="name" @keyup.enter.native="onSubmit('form')">
            <el-input
              name="name"
              autocomplete="on"
              autofocus="autofocus"
              type="text"
              v-model="form.name"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="pwd"
            @keyup.enter.native="onSubmit('form')"
          >
            <el-input
              name="pwd"
              type="password"
              show-password
              v-model="form.pwd"
              placeholder="密码"
            ></el-input>
          </el-form-item>

          <el-button
            type="primary"
            @click="onSubmit('form')"
          >登录</el-button>
          <el-button
            type="warning"
            @click="toRegister()"
          >注册</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    // add by axiang [20190609] 添加判断是否为管理员逻辑
    var validateUsername = (rule, value, callback) => {
      var reg = /^\w+$/
      if (!reg.test(value)) callback(new Error('请输入字母、数字或者下划线'))
      else callback()
    }
    return {
      picUrl: require('../../assets/image/login.jpg'),
      form: {
        name: '',
        pwd: ''
      },
      datas: [],
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'change'
          },
          { validator: validateUsername, trigger: 'change' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    onSubmit (formName) {
      this.logger.d('点击登录按钮')
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.userLogin()
        } else {
          return false
        }
      })
    },
    async userLogin () {
      let params = new URLSearchParams()
      params.append('username', this.form.name)
      params.append('password', this.form.pwd)
      let dataGetLogin = await this.$http.post('/auth/login', params)
      if (dataGetLogin.code !== 100) {
        this.$message.error(dataGetLogin.msg)
        this.logger.e('登录失败')
      } else {
        let username = dataGetLogin.datas[0]
        let token = dataGetLogin.datas[1]
        this.$store.commit('setUsername', username)
        this.$store.commit('setToken', token)
        this.$store.commit('setIsLogin', true)
        this.$message.success(dataGetLogin.msg)
        this.logger.i('登录成功')
        this.checkIsAdmin()
        this.checkIsClockIn()
        this.checkUnReadMsgCount()
        this.$router.push({ path: '/' })
      }
    },
    async checkIsAdmin () {
      this.logger.ms('isAdmin', '判断是否管理员')
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataGetPermission = await this.$http
        .get('/permission/getUserPermission', params)
        .catch(() => {
          this.$message({
            message: '服务器繁忙，请稍后再试！',
            type: 'error'
          })
          this.isAdmin = false
          this.logger.e('获取用户权限失败')
        })
      this.isAdmin = dataGetPermission.datas[0]
      this.$store.commit('setIsAdmin', this.isAdmin)
      this.logger.p({ isAdmin: this.isAdmin })
      this.logger.me('isAdmin', '判断是否管理员')
    },
    async checkIsClockIn () {
      // add by axiang [20190613] 判断用户当天签到状态
      this.logger.ms('isClockIn', '判断是否签到')
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataGetTodayClockIn = await this.$http
        .get('/clockin/getUserTodayClockIn', params)
        .catch(() => {
          this.$message({
            message: '服务器繁忙，请稍后再试！',
            type: 'error'
          })
          this.IsClockIn = true
          this.logger.e('请求签到信息失败')
        })
      if (dataGetTodayClockIn.code === 200) {
        this.$store.commit('setIsClockIn', false)
        this.logger.p({ 'IsClockIn': false })
      } else {
        this.$store.commit('setIsClockIn', true)
        this.logger.p({ 'IsClockIn': true })
      }
      this.logger.me('isClockIn', '判断是否签到')
    },
    async checkUnReadMsgCount () {
      this.logger.ms('UnReadMsgCount', '未读消息数量')
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataUnReadMsgCount = await this.$http
        .get('/message/getUnReadMessageCount', params)
        .catch(() => {
          this.$message({
            message: '服务器繁忙，请稍后再试！',
            type: 'error'
          })
          this.logger.e('请求签到信息失败')
        })

      if (dataUnReadMsgCount.code === 100) {
        let unReadMsgCount = dataUnReadMsgCount.datas[0]
        this.$store.commit('setUnReadMsgCount', unReadMsgCount)
      }
      this.logger.me('UnReadMsgCount', '未读消息数量')
    },
    toRegister () {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 850px;
  height: 380px;
  margin: auto;
  padding: 0;
}

.login {
  width: 100%;
  height: 700px;
  padding-top: 5%;
  margin: 0;
}

.login-box {
  width: 400px;
  height: 100%;
  float: left;
  margin: 20px;
}

h1 {
  letter-spacing: 10px;
  font-size: 40px;
  color: #5d478b;
}

.img {
  float: left;
  background-image: url("../../assets/image/login.jpg");
  background-size: cover;
  width: 380px;
  height: 380px;
}

.el-button{
  float:right;
  margin-left: 20px;
}
</style>
