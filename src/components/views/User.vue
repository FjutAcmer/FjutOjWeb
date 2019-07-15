<template>
  <div class="info-body">
    <el-card class="box-card-userInfo" shadow="always">
      <div class="user-avatar">
        <img class="avatar-img" :src="circleUrl" />
        <img class="avatar-title" :src="titleImgTest" />
      </div>
      <div>
        <h1>
          <span class="user-adjective">{{title.adjective}}</span>
          的
          <span class="user-noun">{{title.noun}}</span>
          <span class="user-nick">{{user.nick}}</span>
          </h1>
        <h2>{{user.motto}}</h2>
      </div>
      <!-- TODO: 暂时使用style，之后替换为css -->
        <div class="info-detail">
          <span style="color:blue;font-size:26px;">{{user.nick}}</span>
          (<span style="color:orange;font-size:26px;">{{user.username}}</span>)在
          <span>{{user.registertime}}</span>加入FJUT OJ，
          来自 <span style="color:white;font-size:26px;">{{user.school}}</span>。<tr/>
          目前共参加了 <span style="color:blue;font-size:26px;">{{user.ratingnum}}</span> 场积分赛，
          积分达到了<span style="color:orange;font-size:26px;">{{user.rating}}</span>，
          在所有人中排名第 <span style="color:red;font-size:26px;">{{user.rank}} </span>。<tr/>
          已经在OJ上AC过<span style="color:red;font-size:26px;">{{user.acnum}}</span>道题目，
          已经<span style="color:red;font-size:26px;">[xxxx]</span>了，
          一共提交过<span style="color:red;font-size:26px;">[xxxx]</span>次。<tr/>
          一共给<span style="color:red;font-size:26px;">[xxxx]</span>道题目贴过标签，
          当前有<span style="color:red;font-size:26px;">{{user.acb}}</span>ACB。<br/>
          <span style="color:#eeeeee;font-size:26px;">正式队员经历：</span><br/>
            <span :key="item" v-for="item in rewordinfo" style="font-size:20px;">
            {{item}}<br/>
            </span>
        </div>
        <div id="info-radar">
        </div>
        <div class="info-permission" v-if="!isVisitor">
          【拥有权限】<br/>
          <el-tag
            effect="dark"
            type="success"
            :key="per"
            size="small"
            v-for="per in this.userPerList"
            >{{per}}</el-tag>
        </div>
    </el-card>
    <el-card class="box-card">
      <div id="graph-rating-change"></div>
    </el-card>
    <el-card class="box-card">
      <div id="graph-submit-change"></div>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        已解决题目:{{problemSolved.length}}
      </div>
      <div :key="item" v-for="item in problemSolved">
        <div
          class="problem-id"
          @click="toSubmit(item)"
        >{{item}}</div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header">
        尝试过但是仍未解决的题目列表：{{problemSolving.length}}
      </div>
      <div :key="item" v-for="item in problemSolving">
        <div
          class="problem-id"
          @click="toSubmit(item)">
        {{item}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import userPerType from '../../util/UserPermissionType.json'

export default {
  data () {
    return {
      circleUrl: require('../../../pic/Head/2.jpg'),
      titleImgTest: 'http://www.fjutacm.com/syspic/Title/9001.png',
      title: {
        adjective: '干活干到晕厥',
        noun: '包工头'
      },
      user: '',
      rewordinfo: '',
      radar: '',
      userPerList: [],
      problemSolved: [],
      problemSolving: [],
      isVisitor: false
    }
  },
  created () {

  },
  mounted () {
    let username = ''
    if (this.$route.query.username) {
      this.isVisitor = true
      username = this.$route.query.username
    } else {
      this.isVisitor = false
      username = this.$store.getters.getUsername
      this.getUserPermission(username)
    }
    this.getUserInfo(username)
    this.getRadarData(username)
    this.getawardinfo(username)
    this.getRatingRecord(username)
    this.getSubmitRecord(username)
    this.getStatusProblems(username)
  },
  methods: {
    async getUserInfo (username) {
      let params = new URLSearchParams()
      params.append('username', username)
      let dataUserInfo = await this.$http
        .get('/user/GUserInfo', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.user = dataUserInfo.datas[0]
      // this.img = this.img + username+'.jpg'
    },
    async getawardinfo () {
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataAwardInfo = await this.$http
        .post('/user/awardinfo', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.rewordinfo = dataAwardInfo.datas[0]
    },
    async getRadarData (username) {
      let params = new URLSearchParams()
      params.append('username', username)
      let dataUserRadar = await this.$http
        .get('/user/getUserRadar', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.radar = dataUserRadar.datas[0]
      this.setRadar()
    },
    async getUserPermission () {
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataUserPermission = await this.$http
        .get('/permission/getUserPermission', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      let perListTemp = dataUserPermission.datas[0]
      for (let i = 0; i < perListTemp.length; i++) {
        this.userPerList.push(userPerType[perListTemp[i]])
      }
    },
    setRadar () {
      let myChart = echarts.init(document.getElementById('info-radar'))
      let r1 = this.radar.split(',')
      r1[0] = r1[0].split('[')[1]
      r1[6] = r1[6].split(']')[0]
      // console.log(r1)
      let option = {
        tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: 'white'
            }
          },
          indicator: [
            { name: '基础', max: 4 },
            { name: '动态规划', max: 4 },
            { name: '搜索', max: 4 },
            { name: '图论', max: 4 },
            { name: '几何', max: 4 },
            { name: '数学', max: 4 },
            { name: '数据结构', max: 4 }
          ]
        },
        series: [
          {
            name: this.user.nick,
            type: 'radar',
            itemStyle: { normal: { areaStyle: { type: 'default' } } },
            data: [{ value: r1 }]
          }
        ]
      }
      myChart.setOption(option)
    },
    async getRatingRecord (username) {
      let params = new URLSearchParams()
      params.append('username', username)
      let dataRatingGraph = await this.$http
        .get('/user/GRatingGraph', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.ratingrecord = dataRatingGraph.datas[0]
      this.setGraphRatingChange()
    },
    setGraphRatingChange () {
      let myChart = echarts.init(document.getElementById('graph-rating-change'))
      let option = {
        tooltip: {},
        title: {
          text: 'Rating变化',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Object.keys(this.ratingrecord)
        },
        yAxis: {
          name: 'submit',
          type: 'value'
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: 'Rating变化',
            type: 'line',
            areaStyle: {},
            data: Object.values(this.ratingrecord)
          }
        ]
      }
      myChart.setOption(option)
    },
    async getSubmitRecord (username) {
      let params = new URLSearchParams()
      params.append('username', username)
      let dataAllStatusByUsername = await this.$http
        .post('/status/GAllStatusByUsername', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.submitrecord = dataAllStatusByUsername.datas[0]
      this.setGraphSubmitChange()
    },
    setGraphSubmitChange () {
      let myChart = echarts.init(document.getElementById('graph-submit-change'))
      // let timeData = [this.submitrecord]
      // console.log(Object.keys(this.submitrecord))
      let option = {
        tooltip: {},
        title: {
          text: '最近1年提交记录',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.submitrecord ? Object.keys(this.submitrecord) : '无'
        },
        yAxis: {
          name: 'submit',
          type: 'value'
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: '提交记录',
            type: 'line',
            areaStyle: {},
            data: this.submitrecord ? Object.values(this.submitrecord) : 0
          }
        ]
      }
      myChart.setOption(option)
    },
    async getStatusProblems (username) {
      let params = new URLSearchParams()
      params.append('username', username)
      params.append('status', 1)
      let dataProblemSolving = await this.$http
        .post('/user/GStatusProblems', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.problemSolved = dataProblemSolving.datas[0]
      params.set('status', 0)
      let dataProblemSolved = await this.$http
        .post('/user/GStatusProblems', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.problemSolving = dataProblemSolved.datas[0]
    },
    toSubmit (val) {
      this.$router.push({ path: '/Submit', query: { pid: val } })
    }
  }

}
</script>

<style scoped >
.info-body {
  min-height: 800px;
  width: auto;
}

.box-card-userInfo {
  background: url(../../assets/image/bg/bg_userindex.jpg);
  background-size: 100% 100%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 20px;
  width: auto;
  min-height: 400px;
  height: auto;
}

.box-card {
  background-size: 100% 100%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 20px;
  min-height: 100px;
  height: auto;
}

.user-avatar {
  text-align: center;
  width: 360px;
  height: 210px;
  margin: auto;
}

.avatar-img {
  position: absolute;
  border: 8px solid #eeeeee;
  border-radius: 180px;
  width: 180px;
  height: 180px;
}

.avatar-title {
  text-align: center;
  width: 140px;
  height: 60px;
  border: 2px solid red;
  border-radius: 18px;
  margin-top: 140px;
  margin-left: 75px;
  z-index: 999;
  transform: rotate(-30deg);
}

.user-adjective {
  color: red;
}

.user-noun {
  color: green;
}

.user-nick {
  color: blue;
}

.info-detail {
  text-align: left;
  float: left;
  width: 790px;
  min-height: 100px;
  font-size: 20px;
  color: white;
  line-height: 40px;
}

#info-radar {
  float: left;
  min-width: 320px;
  height: 320px;
  padding: 5px;
}

#graph-rating-change {
  width: 100%;
  height: 400px;
}

#graph-submit-change {
  width: 100%;
  height: 400px;
}

.info-permission {
  float: left;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  min-height: 100px;
  min-width: 600px;
}

.el-tag {
  margin-bottom: 4px;
  margin-right: 14px;
}

/* .clearfix{
  display: table
} */

.box-card-title {
  font-weight: bold;
  font-size: 18px;
}

.problem-id {
  color: #337ab7;
  float: left;
  width: 90px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 2%;
}

.problem-id:hover {
  color: blue;
  text-decoration: underline;
}
</style>
