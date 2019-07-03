<template>
  <div class="head-box">
    <el-menu
      :default-active="activeIndex"
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
        <el-menu-item index="Contest">练习</el-menu-item>
        <el-menu-item index="8-2">积分</el-menu-item>
        <el-menu-item index="8-3">趣味</el-menu-item>
        <el-menu-item index="8-4">正式</el-menu-item>
        <el-menu-item index="8-5">自定义</el-menu-item>
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
    this.activeIndex = this.$store.getters.getIndex
  },
  mounted () {
    this.activeIndex = this.$store.getters.getIndex
    // this.logger.f(this.activeIndex)
    if (this.isLogin) {
      this.checkUnReadMsgCount()
    }
  },
  computed: {
    activeIndex: {
      get () { return this.$store.getters.getIndex },
      set (val) { this.$store.commit('setIndex', val) }
    },
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
      this.$store.commit('setIndex', key)
    },
    // add by axiang [20190628] 统一处理用户名下拉框的下拉内容
    handleCommand (command) {
      this.$store.commit('setIndex', '')
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
      this.$store.commit('LOGOUT')
      this.handleSelect('Index')
      this.$router.push({ path: '/' })
      this.$message({
        message: '您已退出登录！',
        type: 'info'
      })
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
      this.$router.push({path: 'Verify'})
    },
    // add by axiang [20190613] 签到
    async clockin () {
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataSetClockIn = await this.$http
        .post('/clockin/UserClockIn', params)
        .catch(() => {
          this.$message({
            message: '服务器繁忙，请稍后再试！',
            type: 'error'
          })
        })
      if (dataSetClockIn.code === 200) {
        this.$message({
          message: '签到失败:' + dataSetClockIn.data[0],
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
        .post('/message/getUnReadMessageCountByUser', params)
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

<style>
/* FIXME: add by axiang [20190628] 外部引入样式文件有BUG，暂时先手动引入全局style */

/* 水平菜单的子菜单 */
.el-menu--horizontal > .el-submenu .el-submenu__title {
  width: 110px;
  border-right: 1px solid #eeeeee;
  font-size: 15px;
}

/* 水平菜单的子菜单的菜单项 */
.el-menu--horizontal .el-menu .el-menu-item {
  font-size: 14px;
  width: auto;
}
</style>

<style scoped >
.head-box {
  line-height: 58px;
  float: left;
  padding: 0;
  margin: 0;
  height: auto;
  width: 100%;
  min-width: 1380px;
  /* box-shadow: darkgrey 0px 0px 0px 2px; */

}

.el-menu {
  width: 100%;
  float: left;
  font-size: 16px;
}

.el-menu-item {
  width: 110px;
  font-size: 15px;
  border-right: #eeeeee 1px solid;
}

.el-menu-item:hover {
  font-weight: bolder;
  width: 110px;
}

.el-menu-item-right {
  float: right;
  width: 110px;
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

.menu-rightside{
  float: right;
}

.el-menu-item-userinfo {
  width: auto;
}
.clockin-button{
 margin-right: 20px;
}
.badge-dot {
  line-height: 0px;
  margin-right: 10px;
}
</style>
