<template>
<div class="header">
  <div class="head-box">
    <el-menu
      class="el-menu"
      mode="horizontal"
      active-text-color="#409EFF"
      text-color="black"
      @select="handleSelect"
      router
    >
      <el-menu-item index="Index">主 页</el-menu-item>
      <el-menu-item index="Problem">题 目</el-menu-item>
      <el-menu-item index="Status">评 测</el-menu-item>
      <el-menu-item index="Discuss">
        <span>讨论</span>
      </el-menu-item>
      <el-menu-item index="Challenge">挑战模式</el-menu-item>
      <el-menu-item index="Mall">商 城</el-menu-item>
      <el-menu-item index="HonorRank">荣誉榜</el-menu-item>
      <el-submenu index="ContestSub">
        <template slot="title">比 赛</template>
        <!-- <el-menu-item index="Contest">全部</el-menu-item> -->
        <el-menu-item index="Contest?kind=0">练习</el-menu-item>
        <el-menu-item index="Contest?kind=1">积分</el-menu-item>
        <el-menu-item index="Contest?kind=2">趣味</el-menu-item>
        <el-menu-item index="Contest?kind=3">正式</el-menu-item>
        <el-menu-item index="Contest?kind=5">自定义</el-menu-item>
      </el-submenu>
      <el-submenu index="RankSub">
        <template slot="title">排 名</template>
        <el-menu-item index="MainRank">积分榜</el-menu-item>
        <el-menu-item index="9-1">荣誉榜</el-menu-item>
        <el-menu-item index="9-2">活跃榜</el-menu-item>
        <el-menu-item index="9-3">现役榜</el-menu-item>
        <el-menu-item index="9-4">组队榜</el-menu-item>
      </el-submenu>
      <el-menu-item v-if="this.isAdmin" index="Admin">管理员</el-menu-item>
      <!-- FIXME: 方便调试暂时设置，正式部署时需要去除 -->
      <el-menu-item index="Test">测试</el-menu-item>
      <el-menu-item class="el-menu-item-right" v-if="!this.isLogin" index="Login">登录</el-menu-item>
      <el-menu-item class="el-menu-item-right" v-if="!this.isLogin" index="Register">注册</el-menu-item>
      <div class="menu-rightside">
      <el-button
        class="clockin-button"
        type="primary"
        v-if="this.isLogin && !this.isClockIn"
        size="medium"
        @click="clockin"
      >点我签到</el-button>
      <el-button
        class="clockin-button"
        type="info"
        v-if="this.isLogin && this.isClockIn"
        size="medium"
        @click="toClockIn"
      >你已签到</el-button>
      <el-dropdown class="el-menu-item-userinfo" v-if="this.isLogin" @command="handleCommand">
        <router-link to="User" class="router-link">
          <el-badge is-dot class="badge-dot" v-if="unReadMsgCount > 0">
            <i class="el-icon-user">{{$store.getters.getUsername}}</i>
            <i class="el-icon-arrow-down"></i>
          </el-badge>
          <i class="el-icon-user" v-else>
            {{$store.getters.getUsername}}
            <i class="el-icon-arrow-down"></i>
          </i>
        </router-link>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="toMessage">
            <el-badge :value="unReadMsgCount" :max="99" class="mark" v-if="this.unReadMsgCount > 0">
              <span>
                <i class="el-icon-message">消息</i>
              </span>
            </el-badge>
            <span v-else>
              <i class="el-icon-message">消息</i>
            </span>
          </el-dropdown-item>
          <el-dropdown-item command="toEditUser" divided>
              <i class="el-icon-edit">编辑</i>
          </el-dropdown-item>
           <el-dropdown-item command="toVerify" divided>
              <i class="el-icon-document-checked">认证</i>
          </el-dropdown-item>
          <el-dropdown-item command="logout" divided>
              <i class="el-icon-circle-close">退出</i>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        </div>
    </el-menu>
  </div>
</div>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      type: false,
      datas: []
    }
  },
  created () {
  },
  mounted () {
    if (this.isLogin) {
      this.checkUnReadMsgCount()
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.getIsLogin
    },
    isAdmin () {
      return this.$store.getters.getIsAdmin
    },
    isClockIn () {
      return this.$store.getters.getIsClockIn
    },
    unReadMsgCount () {
      return this.$store.getters.getUnReadMsgCount
    }
  },
  methods: {
    handleSelect (key) {
    },
    // add by axiang [20190628] 统一处理用户名下拉框的下拉内容
    handleCommand (command) {
      if (command === 'toEditUser') {
        this.toEditUser()
      } else if (command === 'toMessage') {
        this.toMessage()
      } else if (command === 'toVerify') {
        this.toVerify()
      } else if (command === 'logout') {
        this.logout()
      }
    },
    logout () {
      // TODO: 请求后端消除redis记录
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      this.$http.post('/user/logout', params)
      this.$store.commit('LOGOUT')
      this.handleSelect('Index')
      this.$router.push({ path: '/' })
      this.$message.warning('您已退出登录！')
    },
    honorRank () {
      this.$router.push({ path: 'HonorRank' })
    },
    toEditUser () {
      this.$router.push({ path: 'EditUser' })
    },
    toClockIn () {
      this.$store.commit('setIndex', '')
      this.$router.push({ path: 'ClockIn' })
    },
    toMessage () {
      this.$router.push({ path: 'Message' })
    },
    toVerify () {
      this.$router.push({ path: 'Verify' })
    },
    // add by axiang [20190613] 签到
    async clockin () {
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataSetClockIn = await this.$http
        .post('/clockin/setUserClockIn', params)
        .catch(() => {
        })
      if (dataSetClockIn.code === 200) {
        this.$message({
          message: '签到失败:' + dataSetClockIn.msg,
          type: 'error'
        })
        this.$store.commit('setIsClockIn', false)
      } else {
        this.$message({ message: '签到成功！', type: 'success' })
        this.$store.commit('setIsClockIn', true)
        this.toClockIn()
      }
    },
    async checkUnReadMsgCount () {
      this.logger.ms('UnReadMsgCount', '未读消息数量')
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataUnReadMsgCount = await this.$http
        .get('/message/getUnReadMessageCount', params)
        .catch(() => {
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

<style scoped >
.header{
  line-height: 58px;
  padding: 0;
  margin: 0;
  height: auto;
  background-color: #f5f5f5;
  width: 100%;
}

.head-box {
  min-width: 1400px;
  width: 90%;
  margin: auto;
}

.el-menu{
  width: 100%;
  border-left: #eeeeee 2px solid;
  border-right: #eeeeee 2px solid;
  margin: auto;
}

.el-menu-item-right {
  float: right !important;
  width: 100px;
  border-right: 0;
  border-left: #eeeeee 1px solid;
}

.router-link {
  text-decoration: none;
  color: black;
  font-size: 16px;
}

.el-menu-item-userinfo {
  min-width: 120px;
  width: auto;
  border-left: 1px solid #eeeeee;
}

.menu-rightside {
  float: right;
}

.el-menu-item-userinfo {
  width: auto;
}

.clockin-button {
  margin-right: 20px;
}

.badge-dot {
  line-height: 0px;
  margin-right: 10px;
}
</style>
