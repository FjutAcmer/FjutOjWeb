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
        <el-menu-item index="Contest">全部</el-menu-item>
        <el-menu-item index="8-1">练习</el-menu-item>
        <el-menu-item index="8-2">积分</el-menu-item>
        <el-menu-item index="8-3">正式</el-menu-item>
        <el-menu-item index="8-4">自定义</el-menu-item>
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
      <!-- TODO: 将dropdown的事件设置为commond默认 -->
      <!-- TODO: 把签到按钮搬过来 -->

      <el-dropdown class="el-menu-item-userinfo" v-if="this.isLogin">
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
          <el-dropdown-item>
            <el-badge :value="unReadMsgCount" :max="99" class="mark" v-if="this.unReadMsgCount > 0">
              <span @click="toMessage">
                <i class="el-icon-message">消息</i>
              </span>
            </el-badge>
            <span @click="toMessage" v-else>
              <i class="el-icon-message">消息</i>
            </span>
          </el-dropdown-item>
          <el-dropdown-item divided >
            <span @click="toEditUser">
              <i class="el-icon-edit">编辑</i>
            </span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout">
              <i class="el-icon-circle-close">退出</i>
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- <el-badge is-dot class="badge-dot" v-if="unReadMsgCount > 0">
          <i class="el-icon-user">{{$store.getters.getUsername}}</i>
          <i class="el-icon-arrow-down"></i>
        </el-badge>
        <i class="el-icon-user" v-else>
          {{$store.getters.getUsername}}
          <i class="el-icon-arrow-down"></i>
        </i>
      </el-menu-item>-->

      <!-- <el-menu-item index="10">消息中心</el-menu-item> -->
      <!-- <el-menu-item index="4">
        <a href="https://www.ele.me" target="_blank">订单管理</a>
      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      type: false,
      activeIndex: '',
      datas: []
    }
  },
  mounted () {
    this.activeIndex = this.$store.getters.getIndex
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
      this.$store.commit('setIndex', key)
    },
    logout () {
      this.$store.commit('LOGOUT')
      this.$message({
        message: '您已退出登录！',
        type: 'info'
      })
      this.$router.push({ path: '/' })
    },
    admin () {
      this.$router.push({ path: 'Admin' })
    },
    honorRank () {
      this.$router.push({ path: 'HonorRank' })
    },
    toEditUser () {
      this.$router.push({ path: 'EditUser' })
    },
    toClockIn () {
      this.$router.push({ path: 'ClockIn' })
    },
    toMessage () {
      this.$router.push({ path: 'Message' })
    },

    // add by axiang [20190613]
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
        this.$router.push({ path: 'ClockIn' })
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

<style scoped>
.head-box {
  line-height: 56px;
  float: left;
  padding: 0;
  margin: 0;
  height: auto;
  width: 100%;
  min-width: 1250px;
}

.el-menu {
  width: 100%;
  float: left;
  font-size: 16px;
  /* left: 100px; */
  /* height: 50px; */
  /* border-bottom: 10px red; */
}

.el-menu-item {
  width: 110px;
  color: gray;
  /* font-size: 16px; */
  /* border-right: 10px red; */
  /* font-size: 16px; */
  /* background-color: red */
}

.el-menu-item:hover {
  font-weight: bolder;
  width: 110px;
  /* font-size: 16px; */
  /* border-right: 10px red; */
  /* font-size: 16px; */
  /* background-color: red */
}

.el-menu-item-right {
  float: right;
  width: 110px;
}

.el-submenu {
  width: 110px;
  /* font-size: 16px; */
}

.router-link {
  text-decoration: none;
  color: black;
  font-size: 16px;
}

.el-menu-item-userinfo {
  float: right;
  min-width: 100px;
  width: auto;
  /* font-size: 15px;
  display: block;
  width: auto;
  line-height: 50px; */
  border-left: 1px solid #eeeeee;
}

.el-menu-item-useri {
  width: auto;
}

.badge-dot {
  line-height: 0px;
  margin-right: 10px;
}
</style>
