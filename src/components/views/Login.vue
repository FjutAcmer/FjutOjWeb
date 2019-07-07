<template>
  <div class="login">
    <el-card :body-style="{ padding: '0px' }" class="box-card">
      <img src="../../assets/Login_left_bg.jpg">
      <div style="width:500px;height:100%;float:right">
        <h1>登录</h1>
        <el-form ref="form" style="margin-top:8%" :model="form" :rules="rules">
          <el-form-item prop="name" style="float:center">
            <input
              name="name"
              autocomplete="on"
              autofocus="autofocus"
              type="text"
              v-model="form.name"
              placeholder="用户名"
              ref="name"
            >
          </el-form-item>
          <el-form-item prop="pwd" style="float:center" @keyup.enter.native="onSubmit('form')">
            <input
              name="pwd"
              type="password"
              show-password
              v-model="form.pwd"
              placeholder="密码"
              ref="pwd"
            >
          </el-form-item>
          <el-button type="primary" @click="onSubmit('form')">登录</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { valid } from 'semver'

export default {
  data () {
    // add by axiang [20190609] 添加判断是否为管理员逻辑
    var validateUsername = (rule, value, callback) => {
      var reg = /^\w+$/
      if (!reg.test(value)) callback(new Error('请输入字母、数字或者下划线'))
      else callback()
    }
    return {
      form: {
        name: '',
        pwd: ''
      },
      datas: [],
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          },
          { validator: validateUsername, trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
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
      this.logger.ms('userLogin', '')
      let params = new URLSearchParams()
      params.append('username', this.$refs.name.value)
      params.append('password', this.$refs.pwd.value)
      let dataGetLogin = await this.$http.post('/token/login', params).catch(() => {
        this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        this.logger.e('请求失败')
      })
      if (dataGetLogin.code !== 100) {
        this.$message({
          message: '登录失败: ' + dataGetLogin.msg,
          type: 'error'
        })
        this.logger.e('登录失败')
      } else {
        console.log(dataGetLogin)
        let username = dataGetLogin.datas[0]
        let token = dataGetLogin.datas[1]
        this.$store.commit('setUsername', username)
        this.$store.commit('setToken', token)
        this.$store.commit('setIsLogin', true)
        this.$message({ message: '登录成功！', type: 'success' })
        this.logger.i('登录成功')
        this.checkIsAdmin()
        this.checkIsClockIn()
        this.checkUnReadMsgCount()
        this.$router.push({ path: '/' })
      }
      this.logger.me('userLogin', '')
    },
    async checkIsAdmin () {
      // TODO: add by axiang [20190609] 添加判断是否为管理员逻辑，目前还没做API，只判断是不是‘admin’账号
      this.logger.ms('isAdmin', '判断是否管理员')
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataGetPermission = await this.$http
        .post('/GUserPermission', params)
        .catch(() => {
          this.$message({
            message: '服务器繁忙，请稍后再试！',
            type: 'error'
          })
          this.isAdmin = false
          this.logger.e('获取用户权限失败')
        })
      this.isAdmin = dataGetPermission.data[0]
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
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 700px;
  padding-top: 5%;
  margin: 0;
  display: block;
}

.box-card {
  width: 900px;
  height: 400px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

input:focus {
  outline: none;
}

input {
  width: 300px;
  margin-bottom: 5%;
  height: 40px;
  border-radius: 20px;
  background-color: #f5f5dc;
  border: 1px solid #f5f5dc;
  padding: 0 20px 0 20px;
}

button {
  width: 340px;
  margin-bottom: 5%;
  height: 40px;
  border-radius: 20px;
  background-color: #00688b;
  border: 1px solid #00688b;
}

h1 {
  letter-spacing: 10px;
  font-size: 40px;
  color: #5d478b;
}

img {
  float: left;
  background-size: cover;
  width: 400px;
  height: 400px;
}
</style>
