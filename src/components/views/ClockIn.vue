<template>
  <div class="ClockInBody">
    <div class="CalendarBox">
      <div class="CalendarBox-head">
        <div class="clockin-title">
          签到记录
          <tr/>
        </div>
        <div>
          <font color="yellow">黄◉:今天未签到</font>
          &emsp;
          <font color="orange">橙◉:今天已签到</font>
          &emsp;
          <font color="orange">橙■:当天已签到</font>
        </div>
      </div>
      <Calendar :markDateMore="clockInDateArr"></Calendar>
    </div>
    <div class="ClockInList">
      <div class="ClockInList-head">
        <div class="clockin-title">
          <font color="blue">{{username}}</font> 的签到记录
        </div>
      </div>
      <el-table :data="tableData" max-height="600" :row-class-name="tableRowClass">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="time" label="签到时间" width="240"></el-table-column>
        <el-table-column prop="sign" label="状态" width="100"></el-table-column>
        <el-table-column prop="ip" label="签到IP"></el-table-column>
        <el-table-column prop="#" label="奖励ACB"></el-table-column>
        <!-- <el-table-column prop='todytimes' label='当天第几次签到'></el-table-column> -->
      </el-table>
    </div>
  </div>
</template>


<script>
import Calendar from "vue-calendar-component";

export default {
  data() {
    return {
      username: "",
      tableData: [],
      clockInDateArr: [],
      today: new Date()
    };
  },
  created() {
    this.username = this.$store.getters.getUsername;
    this.getSomedayClockInList();
  },
  // computed(){},
  // mounted: {},
  components: {
    Calendar
  },
  methods: {
    // add by axiang [20190613] 获取签到列表
    async getSomedayClockInList() {
      this.$log.i("获取签到列表 开始");
      this.tableData = [];
      let params = new URLSearchParams();
      params.append("username", this.username);
      let dataGetClockInList = await this.$http
        .post("/clockin/GUserClockIn", params)
        .catch(() => {
          this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
          this.$log.e("获取签到列表 失败");
        });
      this.$log.s("获取签到列表 成功");
      let data_clockin = dataGetClockInList.data[0];
      for (let i = 0; i < data_clockin.length; i++) {
        let time = data_clockin[i].time;
        let timeStr = new Date(time).toLocaleString();
        let className = "";
        if (data_clockin[i].sign === "日常" || data_clockin[i].sign === "正常")
          className = "clockInNormal";
        else if (data_clockin[i].sign === "迟到") className = "clockInLate";
        else className = "clockInOther";
        this.clockInDateArr.push({
          date: timeStr.split(" ")[0],
          className: className
        });
        this.tableData.push({
          username: data_clockin[i].username,
          time: timeStr,
          sign: data_clockin[i].sign,
          ip: data_clockin[i].ip,
          todytimes: data_clockin[i].todytimes
        });
      }
    },
    tableRowClass({ row, rowIndex }) {
      if ("日常" === row.sign) {
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  }
};
</script>

<style  scoped>
.ClockInBody {
  width: 100%;
  min-height: 600px;
  margin-left: 50px;
  display: flex;
}

.CalendarBox {
  width: 40%;
  height: 100%;
  padding: 5px;
}

.CalendarBox-head {
  background-color: lightblue;
  height: 20px;
  width: 79%;
  margin: 0;
  border-bottom: 1px solid #eeeeee;
  padding: 10px 15px;
  display: block;
}

.wh_container >>> .clockInNormal {
  background-color: orange;
}
.wh_container >>> .clockInLate {
  background-color: plum;
}

.wh_content_item >>> .clockInOther {
  background-color: blue;
}

.ClockInList {
  width: 50%;
  padding: 10px;
}

.ClockInList-head {
  background-color: #f5f5f5;
  height: 20px;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid #eeeeee;
  padding: 10px;
  display: block;
}

.clockin-title {
  float: left;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

