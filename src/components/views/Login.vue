<template>
    <div class="login">
        <el-card class="box-card">
            <h1>登录</h1>
            <el-form ref="form" :model="form" label-width="80px" label-position="top" :rules="rules">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="form.name" ref="name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="form.pwd" ref="pwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { getUser } from "../../api";
import { valid } from 'semver';
import {mapActions} from 'vuex';

export default {
    data() {
      return {
        form:{
          name: '',
          pwd: ''
        },
        datas:[null],
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
          ]
        }
      }
    },

    methods: {

      onSubmit(formName) {
        console.log('点击登录!');
        this.$refs[formName].validate((valid) =>{
          if (valid) {
            this.userSelect();
            console.log('onsubmit正常返回');
          } else {
            console.log('onsubmit错误返回');
            return false;
          }
        });
      },

      async userSelect(){
        console.log('调用userselect');
        let {data} = await getUser().catch(()=>{
          this.$message({message: '服务器繁忙，请稍后再试！',type: 'error'});
        });
        this.datas = data;
        if(this.datas===[]){
          console.log('用户未注册！');
        }else if(this.datas[0].username == this.$refs.name.value && this.datas[0].password == this.$refs.pwd.value){
          let user = {username,userstate};
          user.username = this.datas[0].username;
          user.userstate = true;
          this.setLogin(user);
          this.$message({message: '登录成功',type: 'success'});
          this.$router.push({path:'/'});
        }else{
          this.$message({message: '用户名或者密码错误！',type: 'error'});
        }
        console.log('userselect返回');
      },

      ...mapActions([
        'setLogin'
      ])

    }
}
</script>

<style scoped>
.login{
    width: 100%;
    height: 700px;
    padding-top: 5%;
    margin: 0;
    display: block;
}

.box-card {
    width: 450px;
    height: 450px;
    display: block;
    margin-left: auto;
    margin-right:auto; 
    padding: 0;
  }
</style>
