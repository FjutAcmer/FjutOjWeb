<template>
  <div class="head-box">
    <ul class="head-box-title">
      <li class="head-box-title-item">
        <router-link to="/" class="head-box-title-router">主页</router-link>
      </li>
      <li class="head-box-title-item">
        <router-link to="Problem" class="head-box-title-router">题目</router-link>
      </li>
      <li class="head-box-title-item">
        <router-link to="Status" class="head-box-title-router">评测</router-link>
      </li>
      <li class="head-box-title-item">
        <router-link to="Discuss" class="head-box-title-router">讨论</router-link>
      </li>
      <li class="head-box-title-item">
        <router-link to="Callenge" class="head-box-title-router">挑战模式</router-link>
      </li>
      <li class="head-box-title-item">
        <router-link to="Mall" class="head-box-title-router">商城</router-link>
      </li>
      <li class="head-box-title-item">
        <router-link to="HonorRank" class="head-box-title-router">荣誉榜</router-link>
      </li>
      <el-dropdown class="head-box-title-item">
        <li>
          <router-link to="Contest" class="head-box-title-router">比赛</router-link>
        </li>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span>练习</span>
          </el-dropdown-item>
          <el-dropdown-item divided>积分</el-dropdown-item>
          <el-dropdown-item divided>正式</el-dropdown-item>
          <el-dropdown-item divided>趣味</el-dropdown-item>
          <el-dropdown-item divided>自定义</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="head-box-title-item">
        <li>
          <router-link to="MainRank" class="head-box-title-router">排名</router-link>
        </li>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="honorRank">荣誉榜</span>
          </el-dropdown-item>
          <el-dropdown-item divided>活跃榜</el-dropdown-item>
          <el-dropdown-item divided>现役榜</el-dropdown-item>
          <el-dropdown-item divided>组队榜</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <li v-if="this.isAdmin" class="head-box-title-item">
        <router-link to="Admin" class="head-box-title-router">管理员</router-link>
      </li>
    </ul>
    <ul class="head-box-login-register" v-if="!this.isLogin">
      <li class="head-box-login-register-item">
        <router-link to="Register" class="head-box-title-router">注册</router-link>
      </li>
      <li class="head-box-login-register-item">
        <router-link to="Login" class="head-box-title-router">登录</router-link>
      </li>
    </ul>
    <ul class="head-box-login-register" v-if="this.isLogin">
      <el-button
        class="head-box-clockin-button"
        type="primary"
        v-if="!this.isClockIn"
        size="medium"
        @click="clockin"
      >点我签到</el-button>
      <el-button
        class="head-box-clockin-button"
        type="info"
        v-if="this.isClockIn"
        size="medium"
      >你已签到</el-button>
      <el-dropdown>
        <li class="head-box-login-register-item">
          <router-link to="User" class="head-box-title-router">{{$store.getters.getUsername}}</router-link>
        </li>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>消息</el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="toEditUser">编辑</span>
          </el-dropdown-item>
          <!-- <el-dropdown-item divided>认证</el-dropdown-item> -->
          <el-dropdown-item divided>
            <span @click="toClockIn">签到</span>
          </el-dropdown-item>
          <!-- <el-dropdown-item divided>称号</el-dropdown-item> -->
          <el-dropdown-item divided>
            <span @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      type: false,
      datas: []
    };
  },

  mounted: {},
  computed: {
    isLogin() {
      return this.$store.getters.getIsLogin;
    },
    isAdmin() {
      return this.$store.getters.getIsAdmin;
    },
    isClockIn() {
      return this.$store.getters.getIsClockIn;
    }
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push({ path: "/" });
    },
    admin() {
      this.$router.push({ path: "Admin" });
    },
    honorRank() {
      this.$router.push({ path: "HonorRank" });
    },
    toEditUser() {
      this.$router.push({ path: "EditUser" });
    },
    toClockIn() {
      this.$router.push({ path: "ClockIn" });
    },

    // add by axiang [20190613]
    async clockin() {
      let username = this.$store.getters.getUsername;
      this.$log.i("用户： " + username + " 点击ClockIn按钮");
      let params = new URLSearchParams();
      params.append("username", username);
      let dataSetClockIn = await this.$http
        .post("/clockin/UserClockIn", params)
        .catch(() => {
          this.$message({
            message: "服务器繁忙，请稍后再试！",
            type: "error"
          });
          this.$log.e('请求签到URL失败！');
        });
      if (dataSetClockIn.code === 200) {
        this.$log.e("签到失败！" + dataSetClockIn.data[0]);
        this.$message({ message: "签到失败:" + dataSetClockIn.data[0], type: "error" });
        this.$store.commit("setIsClockIn", false);
      } else {
        this.$log.s("签到成功！");
        this.$message({ message: "签到成功！", type: "success" });
        this.$store.commit("setIsClockIn", true);
        this.$router.push({ path: "ClockIn" });
      }
    }
  }
};
</script>

<style>
.head-box {
  padding: 0;
  margin: 0;
  background: white;
  height: 50px;
  width: 100%;
  min-width: 1250px;
  position: relative;
  font-size: 16px;
  border-bottom: 2px solid #eeeeee;
  box-sizing: border-box;
  display: block;
}

.head-box-title {
  padding: 0;
  margin: 0;
  float: left;
  list-style: none;
  height: 40px;
  /* background-color: blue; */
}

.head-box-title-item {
  font-family: "微软雅黑", "宋体", "Arial Narrow", Helvetica, sans-serif;
  font-size: 15px;
  float: left;
  display: block;
  width: 100px;
  line-height: 50px;
  border-right: 1px solid #eeeeee;
  /* background-color: blue; */
}

.head-box-title-router {
  text-decoration: none;
  color: black;
}

.head-box-title-router:hover {
  font-size: 16px;
  color: lightblue;
}

.head-box-login-register {
  padding: 0;
  margin: 0;
  float: right;
  list-style: none;
  height: 40px;
  /* background-color: blue; */
}

.head-box-login-register-item {
  font-family: "微软雅黑", "宋体", "Arial Narrow", Helvetica, sans-serif;
  font-size: 15px;
  float: left;
  display: block;
  width: 100px;
  line-height: 50px;
  border-left: 1px solid #eeeeee;
  /* background-color: blue; */
}

.head-box-clockin-button {
  text-decoration: none;
  float: left;
  margin-top: 7px;
  margin-right: 5px;
}
</style>
