<template>
  <div class="clockin-body">
    <el-card class="calendar-card" :body-style="{ padding: '0px' }">
      <template slot="header">
        签到日历
      </template>
      <Calendar
        lang="zh"
        :events="this.clockInDateArr"
      ></Calendar>
    </el-card>
    <div class="list-box">
      <font color="blue">{{username}}</font> 的签到记录
      <div>
        <el-pagination
          style="float:left"
          layout="prev, pager, next"
          :total="tableData.length"
          :page-size="pagesize"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          max-height="600"
        >
          <el-table-column
            prop="username"
            label="用户名"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="time"
            label="签到时间"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="sign"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div :class="('日常'===scope.row.sign)?'table-row-normal':('迟到'===scope.row.sign?'table-row-late':'table-row-other')">{{scope.row.sign}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="ip"
            label="签到IP"
          ></el-table-column>
          <el-table-column
            prop="#"
            label="奖励ACB"
          >
            <template>
              <!-- TODO: add by axiang [20190613] 奖励ACB内容暂时留空 -->
            </template>
          </el-table-column>
          <!-- <el-table-column prop='todytimes' label='当天第几次签到'></el-table-column> -->
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
// import Calendar from 'vue-calendar-component'
import Calendar from 'vue-fullcalendar'

export default {
  components: {
    Calendar
  },
  data () {
    return {
      username: '',
      tableData: [],
      clockInDateArr: [],
      today: new Date(),
      pagesize: 10,
      currentTotal: 0,
      currentPage: 1
    }
  },
  created () {
    this.username = this.$store.getters.getUsername
    this.getUserAllClockInList()
  },
  // computed(){},
  // mounted: {},
  methods: {
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.logger.i('currentPage: ' + currentPage)
    },
    // add by axiang [20190613] 获取签到列表
    async getUserAllClockInList () {
      this.logger.ms(this.getUserAllClockInList.className, '')
      let params = new URLSearchParams()
      params.append('username', this.username)
      let dataGetClockInList = await this.$http
        .get('/clockin/getUserClockIn', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
          this.logger.e('获取用户全部签到列表 失败')
        })
      this.logger.i('获取用户签到列表 成功')
      let dataClockIn = dataGetClockInList.datas[0]
      this.logger.p({ currentTotal: this.currentTotal })
      for (let i = 0; i < dataClockIn.length; i++) {
        let time = dataClockIn[i].time
        let timeStr = new Date(time).toLocaleString('chinese', {
          hour12: false
        })
        let className = ''
        if (dataClockIn[i].sign === '日常' || dataClockIn[i].sign === '正常') {
          className = 'clockInNormal'
        } else if (dataClockIn[i].sign === '迟到') {
          className = 'clockInLate'
        } else {
          className = 'clockInOther'
        }
        this.clockInDateArr.push({
          title: '签到：' + dataClockIn[i].sign,
          start: timeStr.split(' ')[0],
          end: timeStr.split(' ')[0],
          cssClass: className
        })
      }
      for (let i = 0; i < dataClockIn.length; i++) {
        let time = dataClockIn[i].time
        let timeStr = new Date(time).toLocaleString('chinese', {
          hour12: false
        })
        this.tableData.push({
          username: dataClockIn[i].username,
          time: timeStr,
          sign: dataClockIn[i].sign,
          ip: dataClockIn[i].ip,
          todytimes: dataClockIn[i].todytimes
        })
      }
      this.logger.p({ 'tableData.length': this.tableData.length })
      this.logger.me(this.getUserAllClockInList.className, '')
    }
  }
}
</script>

<style  scoped>
.clockin-body {
  width: 100%;
  min-height: 600px;
  margin-left: 50px;
  display: flex;
}

.calendar-card {
  width: 40%;
  min-height: 800px;
}

.list-box {
  width: 50%;
  margin-left: 20px;
}

.table-row-normal {
  color: green;
  font-weight: bold;
}

.table-row-late {
  color: red;
  font-weight: bold;
}

.table-row-other {
  color: blue;
  font-weight: bold;
}

</style>
