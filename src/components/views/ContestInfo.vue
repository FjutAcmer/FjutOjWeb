<template>
  <div class="contestinfo-body">
    <h1>{{contestInfo.name}}</h1>
    <el-tabs
      type="border-card"
      v-model="activeTab"
    >
      <el-tab-pane
        label="主页"
        name="1"
      >
        <div class="detail-box">
          比赛时间：
          {{new Date(this.contestInfo.beginTime).
            toLocaleString('chinese', { hour12: false })}} -
          {{new Date(this.contestInfo.endTime).
            toLocaleString('chinese', { hour12: false })}}
          <br />
          比赛状态：
          <span
            v-if="this.contestInfo.status===0"
            class="detail-green-font"
          >正在进行</span>
          <span
            v-else-if="this.contestInfo.status===1"
            class="detail-blue-font"
          >未开始</span>
          <span
            v-else
            class="detail-red-font"
          >已经结束</span>
          <br />
          比赛说明：<span v-html="this.contestInfo.info?this.contestInfo.info:'无'"></span>
          <!-- <ContestProblemBody :isContestView="true"></ContestProblemBody> -->
          <!-- <el-button @click="swithTabPane('2')">switch</el-button> -->
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="题目列表"
        name="2"
        style="padding:0px;margin:0px;"
      >
        <el-button
          v-for="item in ProblemList"
          :key="item.tpid"
          @click="swithProblem(item.tpid)"
          type="info"
          plain
        >{{String.fromCharCode(item.pid+65)}}</el-button>
        <el-divider></el-divider>
        <ContestSubmitComponent
          v-if="this.showSubmit && this.ProblemList.length"
          :readOnly="this.contestInfo.status!==0"
          :pid="selectedPid"
          :cid="String(this.$route.query.cid)"
          @toPane="swithTabPane"
        ></ContestSubmitComponent>
      </el-tab-pane>
      <el-tab-pane
        label="在线评测"
        name="3"
      >
        <ContestStatusComponent
          v-if="this.showStatus"
          :cid="this.contestId"
        ></ContestStatusComponent>
      </el-tab-pane>
      <el-tab-pane
        label="实时排名"
        name="4"
      ></el-tab-pane>
      <el-tab-pane
        label="在线讨论"
        name="5"
      >
        <ContestOnlineDiscussComponent></ContestOnlineDiscussComponent>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ContestProblemComponent from '../views/ContestInfo/ContestProblemComponent'
import ContestSubmitComponent from '../views/ContestInfo/ContestSubmitComponent'
import ContestStatusComponent from '../views/ContestInfo/ContestStatusComponent'
import ContestOnlineDiscussComponent from '../views/ContestInfo/ContestOnlineDiscussComponent'
export default {
  data () {
    return {
      activeTab: '1',
      contestInfo: '',
      selectedPid: '1',
      ProblemList: [],
      contestId: '',
      showSubmit: false,
      showStatus: false
    }
  },
  components: {
    ContestProblemComponent,
    ContestSubmitComponent,
    ContestStatusComponent,
    ContestOnlineDiscussComponent
  },
  created () {
    this.contestId = String(this.$route.query.cid)
    this.showStatus = true
  },
  mounted () {
    this.getProblemList()
    this.getContest()
  },
  methods: {
    async getContest () {
      let params = new URLSearchParams()
      params.append('cid', this.contestId)
      console.log(this.contestId)
      let dataContest = await this.$http
        .get('/contest/getContestByCid', params)
        .catch(() => {
        })
      this.contestInfo = dataContest.datas[0]
    },
    async getProblemList () {
      this.contestId = String(this.$route.query.cid)
      let params = new URLSearchParams()
      params.append('cid', this.contestId)
      let dataProblemList = await this.$http
        .get('/contest/getContestProblem', params)
        .catch(() => {
        })
      this.ProblemList = dataProblemList.datas[0]
      this.selectedPid = String(this.ProblemList[0].tpid)
      this.showSubmit = true
    },
    swithProblem (pid) {
      this.selectedPid = String(pid)
    },
    swithTabPane (val) {
      this.activeTab = val
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$confirm('正在离开本页面，本页面内所有未保存数据都会丢失', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      next()
    }).catch(() => { })
  }
}
</script>

<style scoped>
.contestinfo-body {
  width: 90%;
  margin: auto;
  min-height: 400px;
  margin-bottom: 20px;
}

.detail-box {
  width: 80%;
  text-align: left;
  line-height: 40px;
  margin: auto;
  font-size: 18px;
}

.detail-font {
  font-size: 18px;
}

.detail-green-font {
  font-size: 18px;
  color: green;
  font-weight: bold;
}

.detail-blue-font {
  font-size: 18px;
  color: blue;
  font-weight: bold;
}

.detail-red-font {
  font-size: 18px;
  color: red;
  font-weight: bold;
}
</style>>
