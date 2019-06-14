<template>
  <div class="container">
    <el-card class="box-card-userInfo" style="min-height:800px;">
      <!-- <div class="head">
                <img :src="img">
      </div>-->
      <div class="name">
        <h1>{{user.nick}}</h1>
        <h2>{{user.motto}}</h2>
      </div>
      <div class="userbottom">
        <div class="detail" style="text-align: left;font-size:20px">
          &emsp;&emsp;{{user.nick}}
          <font style="color:blue;font-size:30px">({{user.username}})</font>
          在{{user.registertime}}加入OJ，来自
          <font
            style="color:blue;font-size:25px"
          >{{user.school}}</font>。
          <!--<br>
          &emsp;&emsp;截止目前共参加了{{user.ratingnum}}场积分赛，当前rating达到{{user.rating}}了已经出神入化，-->
          在所有人中排名第{{user.rank}}。已经在OJ上AC过{{user.acnum}}道题目。
          <br>&emsp;&emsp;
          <!-- 一共给{{puttagnum}}道题目贴过标签，当前有{{user.acb}}ACB。-->
          <br>
          <div class="detail" style="width:200%;text-align: left;">
            <p>正式队员经历：</p>
            <div :key="item" v-for="item in rewordinfo">
              <p>&emsp;&emsp;{{item}}</p>
            </div>
          </div>
          <div v-if="!this.$route.query.username">
            <div
              @click="toAdmin"
              v-if="isAdmin"
              style="margin-left:10px;cursor:pointer;margin-bottom:10px;color:blue;width:100px"
            >拥有权限: Admin</div>
            <div
              v-if="!isAdmin"
              style="margin-left:100px;margin-bottom:10px;color:green;width:100px"
            >普通用户</div>
          </div>
        </div>
        <div id="leida" style="width: 400px;height:300px;float:right;margin-bottom:10px"></div>
      </div>
    </el-card>
    <el-card class="box-card" style="height:600px">
      <div id="zhexian2" style="width: 100%;height:500px"></div>
    </el-card>
    <el-card class="box-card" style="height:600px">
      <div id="zhexian" style="width: 100%;height:500px"></div>
    </el-card>
    <el-card class="box-card" style="height:600px">
      <div id="quxian" style="width: 100%;height:500px"></div>
    </el-card>
    <el-card class="box-card" style="min-height:200px">
      <div slot="header" class="clearfix">
        <span style="float:left;">已解决题目列表: {{statusproblems1.length}}</span>
      </div>
      <div style="width:100%;text-align:left;" :key="item" v-for="item in statusproblems1">
        <div
          style="width:80px;float:left;cursor:pointer;margin-bottom:10px;margin-left:2%;"
          @click="toSubmit(item)"
        >{{item}}</div>
      </div>
    </el-card>
    <el-card class="box-card" style="min-height:200px">
      <div slot="header" class="clearfix">
        <span style="float:left">尝试过但是仍未解决的题目列表: {{statusproblems2.length}}</span>
      </div>
      <div style="width:100%;text-align:left;" :key="item" v-for="item in statusproblems2">
        <div
          style="width:80px;float:left;cursor:pointer;margin-bottom:10px;margin-left:2%;"
          @click="toSubmit(item)"
        >{{item}}</div>
      </div>
    </el-card>
    <!-- <el-card class="box-card" style="min-height:200px">
            <div slot="header" class="clearfix">
                <span style="float:left">待贴标签题目列表:</span>
            </div>
            <div style="width:100%;text-align:left;" :key="item" v-for="item in canviewcodeproblems">
                {{item}}
            </div>
    </el-card>-->
  </div>
</template>

<script>
import echarts from "echarts";
import { setInterval } from "timers";

export default {
  data() {
    return {
      img: "http://120.78.128.11/pic/head/",
      name: "",
      rewordinfo: "",
      user: "",
      radar: [],
      puttagnum: "",
      statusproblems2: "",
      statusproblems1: "",
      canviewcodeproblems: "",
      submitrecord: [],
      ratingrecord: [],
      acrecord: "",
      isAdmin: ""
    };
  },
  created() {
    this.getUserInfo();
    this.getRadarData();
    this.getawardinfo();
    // this.getPutTagNum();
    this.getStatusProblems2();
    this.getStatusProblems1();
    this.getSubmitRecord();
    this.getRatingRecord();
    this.getAcRecord();
    this.getUserPermission();
  },
  methods: {
    toSubmit(val) {
      this.$router.push({ path: "/Submit", query: { pid: val } });
    },
    async getRadarData() {
      // console.log('调用getRadarData');
      let username;
      if (this.$route.query.username) {
        username = this.$route.query.username;
      } else {
        username = this.$store.getters.getUsername;
      }
      let params = new URLSearchParams();
      params.append("username", username);
      let dataUserRadar = await this.$http
        .post("/GUserRadar", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.radar = dataUserRadar.data[0];
      // console.log(this.radar);
      this.leida();
    },
    // async getPutTagNum(){
    //     // console.log('调用getPutTagNum');
    //     let params = new URLSearchParams();
    //     params.append('username', sessionStorage.getItem('username'));
    //     let {data} = await this.$http.post('/GPutTagNum',params).catch(()=>{
    //         this.$message({message: '服务器繁忙，请稍后再试！',type: 'error'});
    //     });
    //     this.puttagnum = data.data[0];
    // },
    async getUserInfo() {
      // console.log('调用getUserInfo');
      let username;
      if (this.$route.query.username) {
        username = this.$route.query.username;
      } else {
        username = this.$store.getters.getUsername;
      }
      let params = new URLSearchParams();
      params.append("username", username);
      let dataUserInfo = await this.$http
        .post("/GUserInfo", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.user = dataUserInfo.data[0];
      // this.img = this.img + username+'.jpg'
    },
    async getawardinfo() {
      // console.log('调用getawardinfo');
      let username;
      if (this.$route.query.username) {
        username = this.$route.query.username;
      } else {
        username = this.$store.getters.getUsername;
      }
      let params = new URLSearchParams();
      params.append("username", username);
      let dataAwardInfo = await this.$http
        .post("/awardinfo", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.rewordinfo = dataAwardInfo.data[0];
    },
    async getStatusProblems2() {
      // console.log('调用getStatusProblems');
      let username;
      if (this.$route.query.username) {
        username = this.$route.query.username;
      } else {
        username = this.$store.getters.getUsername;
      }
      let params = new URLSearchParams();
      params.append("username", username);
      params.append("status", 0);
      let dataStatusProblems = await this.$http
        .post("/GStatusProblems", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.statusproblems2 = dataStatusProblems.data[0];
    },
    async getStatusProblems1() {
      let username;
      if (this.$route.query.username) {
        username = this.$route.query.username;
      } else {
        username = this.$store.getters.getUsername;
      }
      let params = new URLSearchParams();
      params.append("username", username);
      params.append("status", 1);
      let dataStatusProblems = await this.$http
        .post("/GStatusProblems", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.statusproblems1 = dataStatusProblems.data[0];
    },
    async getCanViewCodeProblems() {
      // console.log('调用getCanViewCodeProblems');
      let username;
      if (this.$route.query.username) {
        username = this.$route.query.username;
      } else {
        username = this.$store.getters.getUsername;
      }
      let params = new URLSearchParams();
      params.append("username", username);
      let dataCanViewCodeProblems = await this.$http
        .post("/Gcanviewcodeproblems")
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.canviewcodeproblems = dataCanViewCodeProblems.data[0];
    },
    async getSubmitRecord() {
      // console.log('调用getSubmitRecord');
      let username;
      if (this.$route.query.username) {
        username = this.$route.query.username;
      } else {
        username = this.$store.getters.getUsername;
      }
      let params = new URLSearchParams();
      params.append("username", username);
      let dataAllStatusByUsername = await this.$http
        .post("/status/GAllStatusByUsername", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.submitrecord = dataAllStatusByUsername.data[0];
      // console.log(this.submitrecord);
      this.zhexian1();
    },
    async getRatingRecord() {
      // console.log('调用getRatingRecord');
      let username;
      if (this.$route.query.username) {
        username = this.$route.query.username;
      } else {
        username = this.$store.getters.getUsername;
      }
      let params = new URLSearchParams();
      params.append("username", username);
      let dataRatingGraph = await this.$http
        .post("/GRatingGraph", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.ratingrecord = dataRatingGraph.data[0];
      // console.log(this.submitrecord);
      this.zhexian2();
    },
    async getAcRecord() {
      // console.log('调用getRatingRecord');
      let username;
      if (this.$route.query.username) {
        username = this.$route.query.username;
      } else {
        username = this.$store.getters.getUsername;
      }
      let params = new URLSearchParams();
      params.append("username", username);
      let dataAcGraph = await this.$http.post("/GAcGraph", params).catch(() => {
        this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
      });
      this.acrecord = dataAcGraph.data[0];
      // console.log(this.acrecord);
      this.quxian();
    },
    async getUserPermission() {
      // console.log('调用getRatingRecord');
      let username;
      if (this.$route.query.username) {
        username = this.$route.query.username;
      } else {
        username = this.$store.getters.getUsername;
      }
      let params = new URLSearchParams();
      params.append("username", username);
      let dataUserPermission = await this.$http
        .post("/GUserPermission", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
        });
      this.isAdmin = dataUserPermission.data[0];
      // console.log(this.acrecord);
    },
    toAdmin() {
      this.$router.push({ path: "/Admin" });
    },
    leida() {
      let myChart = echarts.init(document.getElementById("leida"));
      let r1 = this.radar.split(",");
      r1[0] = r1[0].split("[")[1];
      r1[6] = r1[6].split("]")[0];
      // console.log(r1);
      let option = {
        tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "基础", max: 5 },
            { name: "动态规划", max: 5 },
            { name: "搜索", max: 5 },
            { name: "图论", max: 5 },
            { name: "几何", max: 5 },
            { name: "数学", max: 5 },
            { name: "数据结构", max: 5 }
          ]
        },
        series: [
          {
            name: this.user.nick,
            type: "radar",
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [{ value: r1 }]
          }
        ]
      };
      myChart.setOption(option);
    },
    zhexian1() {
      let myChart = echarts.init(document.getElementById("zhexian"));
      let timeData = [this.submitrecord];
      // console.log(Object.keys(this.submitrecord));
      let option = {
        title: {
          text: "最近1年提交记录",
          x: "center"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.submitrecord ? Object.keys(this.submitrecord) : "无"
        },
        yAxis: {
          name: "submit",
          type: "value"
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: "ac",
            type: "line",
            areaStyle: {},
            data: this.submitrecord ? Object.values(this.submitrecord) : 0
          }
        ]
      };
      myChart.setOption(option);
    },
    zhexian2() {
      let myChart2 = echarts.init(document.getElementById("zhexian2"));
      let timeData = [this.ratingrecord];
      // console.log(Object.keys(this.submitrecord));
      let option = {
        title: {
          text: "Rating变化",
          x: "center"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: Object.keys(this.ratingrecord)
        },
        yAxis: {
          name: "submit",
          type: "value"
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: "ac",
            type: "line",
            areaStyle: {},
            data: Object.values(this.ratingrecord)
          }
        ]
      };
      myChart2.setOption(option);
    },
    quxian() {
      let myChart = echarts.init(document.getElementById("quxian"));
      let option = {
        title: {
          text: "AC",
          x: "center"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.acrecord[0]
        },
        yAxis: {
          name: "acNum",
          type: "value"
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            data: this.acrecord[1],
            type: "line",
            smooth: true
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.userbottom {
  display: inline;
}

.container {
  padding: 10px 10% 10px 10%;
  margin: 0;
  width: auto;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  margin: 0 0 10px 0;
}

.box-card-userInfo {
  width: 100%;
  margin: 0 0 10px 0;
  min-height: 500px;
}

.head {
  margin: 10px 0 0 0;
  padding: 0;
  height: 200px;
  width: 100%;
}

.head img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: solid 6px rgba(255, 255, 255, 0.3);
}

.name {
  margin: 0;
  padding: 5% 0 5% 0;
  width: 100%;
  height: 150px;
}

.detail {
  margin-bottom: 10px;
  padding: 0 25px 0 25px;
  min-height: 300px;
  width: 40%;
  float: left;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
