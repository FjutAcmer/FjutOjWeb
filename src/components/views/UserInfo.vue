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
        <div class="info-permission">
          【拥有权限】<br/><br/>
          <el-tag

            effect="dark"
            type="success"
            :key="per"
            size="small"
            v-for="per in this.userPerList"
            >{{per}}</el-tag>
        </div>
    </el-card>
    <el-card class="box-card"></el-card>
    <el-card class="box-card"></el-card>
    <el-card class="box-card"></el-card>
    <el-card class="box-card"></el-card>
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
      userPerList: []
    }
  },
  created () {
    this.getUserInfo()
    this.getRadarData()
    this.getawardinfo()
    this.getUserPermission()
  },
  mounted () {
  },
  methods: {
    async getUserInfo () {
      let username = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('username', username)
      let dataUserInfo = await this.$http
        .post('/user/GUserInfo', params)
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
    async getRadarData () {
      let username = this.$store.getters.getUsername
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
      console.log(this.userPerList)
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
            { name: '基 础', max: 2 },
            { name: '动态规划', max: 2 },
            { name: '搜 索', max: 2 },
            { name: '图 论', max: 2 },
            { name: '几 何', max: 2 },
            { name: '数 学', max: 2 },
            { name: '数据结构', max: 2 }
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
    }
  }
}
</script>

<style scoped>
.info-body {
  min-height: 800px;
  width: auto;
}

.box-card-userInfo {
  background: url(../../assets/bg-userindex.jpg);
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
  width: auto;
  min-height: 400px;
  height: auto;
}

.user-avatar {
  text-align: center;
  width: 360px;
  height: 210px;
  margin-left: 36%;
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
  min-height: 200px;
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

.info-permission {
  float: left;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  min-height: 100px;
  min-width: 600px;
}

.el-tag{
  margin-bottom: 4px;
  margin-right: 14px;
}
</style>
