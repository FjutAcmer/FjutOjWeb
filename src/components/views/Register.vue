<template>
  <div class="register">
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <h1>注册</h1>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="form.name" class="el-input" ref="name" placeholder="*用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input show-password v-model="form.pwd" class="el-input" ref="pwd" placeholder="*密码"></el-input>
        </el-form-item>
        <el-form-item prop="pwd2">
          <el-input
            show-password
            v-model="form.pwd2"
            class="el-input"
            ref="pwd2"
            placeholder="*确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nick">
          <el-input v-model="form.nick" ref="nick" class="el-input" placeholder="*昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.school" ref="school" class="el-input" placeholder="学校"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.email" ref="email" class="el-input" placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.motto" ref="motto" class="el-input" placeholder="签名"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit('form')">注册</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    // add by axiang [20190609] 规范用户名输入内容，只允许输入字母、数字、下划线
    var validateUsername = (rule, value, callback) => {
      var reg = /^\w+$/
      if (!reg.test(value)) callback(new Error('请输入字母、数字或者下划线'))
      else callback()
    }

    return {
      form: {
        name: '',
        motto: '',
        email: '',
        school: '',
        nick: '',
        pwd2: '',
        pwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          },
          { validator: validateUsername, trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],
        pwd2: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ],
        nick: [
          { required: true, message: '请输入昵称', trigger: 'change' },
          { min: 4, max: 12, message: '长度在4到12个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.logger.ms('onSubmit', '点击注册！')
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.userInsert()
          this.logger.i('onsubmit正常')
        } else {
          this.logger.e('onsubmit错误')
          return false
        }
      })
      this.logger.me('onSubmit', '点击注册！')
    },
    async userInsert () {
      this.logger.ms('userInsert', '调用userInsert')
      if (this.$refs.pwd.value !== this.$refs.pwd2.value) {
        this.$message({ message: '两次密码不正确', type: 'error' })
        this.logger.e('两次密码不一致')
      } else {
        let params = new URLSearchParams()
        params.append('username', this.$refs.name.value)
        params.append('password', this.$refs.pwd.value)
        params.append('nick', this.$refs.nick.value)
        params.append('email', this.$refs.email.value)
        params.append('school', this.$refs.school.value)
        params.append('motto', this.$refs.motto.value)
        let dataInserUser = await this.$http
          .post('/user/insertUser', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
            this.logger.e('userInsert服务器未响应返回')
          })
        if (dataInserUser.code !== 100) {
          this.$message({ message: '注册未成功！' + dataInserUser.msg, type: 'error' })
          this.logger.e('注册失败 ' + dataInserUser.msg)
        } else {
          this.$message({ message: '注册成功', type: 'success' })
          this.logger.i('注册成功')
          this.$router.push({ path: '/Login' })
        }
      }
      this.logger.me('userInsert', '调用userInsert')
    }
  }
}
</script>

<style scoped>
.register {
  width: 100%;
  height: 700px;
  padding-top: 5%;
  margin: 0;
  display: block;
}

.box-card {
  width: 550px;
  height: 620px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 0;
  padding: 0;
  background-image: url("../../assets/register_head_bg.jpg");
  background-size: cover;
}

button {
  width: 250px;
  margin-bottom: 5%;
  height: 40px;
  border-radius: 20px;
  background-color: #00688b;
  border: 1px solid #00688b;
}

h1 {
  letter-spacing: 10px;
  font-size: 40px;
  color: #ffffff;
}

.el-input {
  width: 55%;
}
</style>
