<template>
    <div class="register">
        <el-card class="box-card">
            <h1>注册</h1>
            <el-form ref="form" :model="form" label-width="80px" label-position="right">
                <el-form-item label="用户名*">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码*">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="确认密码*">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="呢陈">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="学校">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="签名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" >注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          name: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
    width: 30%;
    height: 600px;
    display: block;
    margin-left: auto;
    margin-right:auto; 
    padding: 0;
  }

</style>
