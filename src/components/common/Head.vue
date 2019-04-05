<template>
  <div class="head-box">
    <ul class="head-box-ul">
      <el-dropdown v-show="true" style="float:right">
        <li class="head-box-ul li" @click="all">{{comp}}</li>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>练习</el-dropdown-item>
            <el-dropdown-item divided>积分</el-dropdown-item>
            <el-dropdown-item divided>正式</el-dropdown-item>
            <el-dropdown-item divided>趣味</el-dropdown-item>
            <el-dropdown-item divided>Diy</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      <li v-show="!userstate"><router-link to="Login" style="text-decoration:none;color:black">Login</router-link></li>
      <li style="border-left:1px solid #eeeeee" v-show="!userstate"><router-link to="Register" style="text-decoration:none;color:black">Register</router-link></li>
      <li style="float:left"><router-link to="/" style="text-decoration:none;color:black">Home</router-link></li>
      <li style="float:left"><router-link to="Problem" style="text-decoration:none;color:black">Problem</router-link></li>
      <li style="float:left"><router-link to="Submit" style="text-decoration:none;color:black">Status</router-link></li>
      <li style="float:left">Discuss</li>
      <li style="float:left">Challenge</li>
      <li style="float:left"><router-link to="Mall" style="text-decoration:none;color:black">Mall</router-link></li>
      <el-dropdown style="float:left">
        <li class="head-box-ul li">Contest</li>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>练习</el-dropdown-item>
            <el-dropdown-item divided>积分</el-dropdown-item>
            <el-dropdown-item divided>正式</el-dropdown-item>
            <el-dropdown-item divided>趣味</el-dropdown-item>
            <el-dropdown-item divided>Diy</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown style="float:left">
        <li style="float:left">Rank</li>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>荣誉榜</el-dropdown-item>
            <el-dropdown-item divided>活跃榜</el-dropdown-item>
            <el-dropdown-item divided>现役榜</el-dropdown-item>
            <el-dropdown-item divided>组队榜</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </ul>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import { log } from 'util';

export default {
    name:'Head',
    data(){
      return {
        type: 2
      }
    },
    computed: {
      comp(){
        return this.username+'';
      },
      ...mapGetters([
        'loadingState'
      ]),
      ...mapState([
        'username',
        'userstate'
      ])

    },
    methods: {
      all:function(){
        let user = {username:'LUBIN',userstate:true};
        this.$store.commit('setLogin',user);
      }
    },
    beforeCreate(){
      let user = {username:'lubin',userstate:false};
      this.$store.commit('setLogin',user);
    }
}
</script>

<style>
.head-box{
    padding: 0;
    margin: 0;
    background:white;
    height: 50px;
    width: 100%;
    position: relative;
    border-bottom: 2px solid #eeeeee;
    box-sizing: border-box;
    display: block;
}

.head-box-ul{
  padding: 0;
  margin: 0;
}

.head-box-ul li{
  font-family:  '微软雅黑',"宋体","Arial Narrow",Helvetica,sans-serif;
  font-size: 12px;
  float: right;
  display: block;
  width: 80px;
  line-height: 50px;
  border-right: 1px solid #eeeeee;
}
</style>
