<template>
  <div class="docker">
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <el-form :model="form" class="el-form">
        <el-form-item prop="pwd">
          <el-input show-password v-model="form.pwd" class="el-input" ref="pwd" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item prop="pwd2">
          <el-input
            show-password
            v-model="form.pwd2"
            class="el-input"
            ref="pwd2"
            placeholder="确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.nick" ref="nick" class="el-input" placeholder="昵称"></el-input>
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
        <el-button type="primary" @click="editUser">修改</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        motto: '',
        email: '',
        school: '',
        nick: '',
        pwd2: '',
        pwd: ''
      }
    }
  },
  methods: {
    async editUser () {
      if (
        this.$refs.motto.value === '' &&
        this.$refs.email.value === '' &&
        this.$refs.school.value === '' &&
        this.$refs.nick.value === '' &&
        this.$refs.pwd.value === ''
      ) {
        this.$message({ message: '修改数据不能为空！', type: 'error' })
      } else if (this.$refs.pwd.values !== this.$refs.pwd2.values) {
        this.$message({ message: '两次密码不同！', type: 'error' })
      } else {
        let params = new URLSearchParams()
        params.append('username', this.$store.getters.getUsername)
        params.append('password', this.$refs.pwd.value)
        params.append('nick', this.$refs.nick.value)
        params.append('school', this.$refs.school.value)
        params.append('motto', this.$refs.motto.value)
        params.append('Email', this.$refs.email.value)
        let dataUpdateUser = await this.$http
          .post('/updateUser', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
            // return
          })
        this.$message({ message: dataUpdateUser.data[0], type: 'success' })
      }
    }
  }
}
</script>
<style scoped>
.docker {
  width: 100%;
  min-height: 800px;
  margin: 0;
  padding: 0;
}

.box-card {
  width: 550px;
  height: 700px;
  display: block;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  border: 0;
  padding: 0;
}

.el-form {
  margin-top: 200px;
}

button {
  width: 250px;
  margin-bottom: 5%;
  height: 40px;
  border-radius: 20px;
  color: black;
  background-color: #afeeee;
  border: 1px solid #afeeee;
}

.el-input {
  width: 55%;
}
</style>
