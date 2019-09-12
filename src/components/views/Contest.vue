<template>
  <!-- FIXME: add by axiang [20190702] 交互性不明确，显示的内容不全面，功能不完整。建议重构，计划中-->
  <div class="contest-body">
    <el-card class="box-card">
      <div slot="header">比赛列表</div>
      <div class="contest-filter">
        <el-row type="flex">
          <!-- FIXME: add by axiang [20190703] 筛选框是假的 -->
          <el-col :span="4">
            <el-input
              placeholder="请输入内容"
              size="mini"
            >
              <template slot="prepend">名称</template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-select
              placeholder="请选择权限"
              size="mini"
            ></el-select>
          </el-col>
          <el-col :span="5">
            <el-select
              placeholder="请选择状态"
              size="mini"
            ></el-select>
          </el-col>
          <el-col :span="4">
            <el-button
              icon="el-icon-search"
              type="primary"
              size="mini"
              @click="getSearch(1)"
            >筛选</el-button>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :current-page="currentPage"
        @current-change="swithPage"
        :total="currentTotal"
        :page-size="20"
      ></el-pagination>
      <el-table
        :data="tableData"
        v-loading="loading"
      >
        <el-table-column
          prop="id"
          label="#"
          width="100"
        ></el-table-column>
        <el-table-column
          label="类型"
          width="150"
        >
          <template slot-scope="scope">
            <div
              class="green-font"
              v-if="scope.row.kind==0"
            >练习</div>
            <div
              class="blue-font"
              v-else-if="scope.row.kind==1"
            >积分</div>
            <div
              class="black-font"
              v-else-if="scope.row.kind==2"
            >趣味</div>
            <div
              class="gray-font"
              v-else-if="scope.row.kind==3"
            >正式</div>
            <!-- <div
              v-else-if="scope.row.kind==4"
            >隐藏</div> -->
            <div
              class="lightcoral-font"
              v-else-if="scope.row.kind==5"
            >DIY</div>
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          width="300"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="toContestInfo(scope.row)"
            >{{scope.row.name}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="开始时间"
          width="200"
        ><template slot-scope="scope">{{new Date(scope.row.beginTime).toLocaleString('chinese', { hour12: false })}}</template>
        </el-table-column>
        <el-table-column
          label="结束时间"
          width="200"
        ><template slot-scope="scope">{{new Date(scope.row.endTime).toLocaleString('chinese', { hour12: false })}}</template></el-table-column>
        <el-table-column
          label="权限"
          width="100"
        >
          <template slot-scope="scope">
            <div
              class="green-font"
              v-if="scope.row.ctype==0"
            >公开</div>
            <div
              style="color:green"
              v-if="scope.row.ctype==1"
            >密码</div>
            <div
              style="color:purple"
              v-if="scope.row.ctype==2"
            >私有</div>
            <div
              style="color:blue"
              v-if="scope.row.ctype==3"
            >注册</div>
            <div
              class="orange-font"
              v-if="scope.row.ctype==4"
            >正式</div>
            <div
              style="color:darkorange"
              v-if="scope.row.ctype==5"
            >组队</div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          style="width:30%"
        >
          <template slot-scope="scope">
            <div
              class="green-font"
              v-if="scope.row.status==0"
            >正在进行</div>
            <div
              class="blue-font"
              v-else-if="scope.row.status==1"
            >未开始</div>
            <div
              class="red-font"
              v-else-if="scope.row.status==2"
            >已结束</div>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentPage: 1,
      currentTotal: 0,
      tableData: [],
      input: '',
      isSearch: false,
      loading: false
    }
  },
  mounted () {
    this.getContest()
  },
  watch: {
    /*
     多个比赛列表用的同一个组件，传入不同参数，
     如果单纯改变参数则不刷新。以下逻辑为强制刷新
     */
    '$route' (to, from) {
      this.currentPage = 1
      this.getContest()
    }
  },
  methods: {
    async getContest () {
      this.loading = true
      this.tableData = []
      let params = new URLSearchParams()
      params.append('pageNum', this.currentPage)
      params.append('kind', this.$route.query.kind)
      // params.append('ctype', xxx)
      // params.append('status',xxx)
      let dataAllContest = await this.$http
        .get('/contest/getContestByCondition', params)
        .catch(() => {
        })
      this.currentTotal = dataAllContest.datas[0]
      this.tableData = dataAllContest.datas[1]
      this.loading = false
    },
    swithPage (val) {
      this.currentPage = val
      this.getContest()
    },
    // toSignUp (row) {
    //   if (!this.$store.getters.getIsLogin) {
    //     this.$notify({
    //       title: '提示',
    //       message: '登录后才能查看哦',
    //       type: 'warning',
    //       offset: 100,
    //       duration: 3000
    //     })
    //   } else if (row.status === 2) {
    //     this.$message({
    //       message: '比赛已经结束，不能报名！',
    //       type: 'error'
    //     })
    //   } else if (row.status === 0) {
    //     this.$message({
    //       message: '比赛已开始，不能报名！',
    //       type: 'error'
    //     })
    //   } else {
    //     this.$router.push({
    //       path: '/ContestSignUp',
    //       query: {
    //         cid: row.id
    //       }
    //     })
    //   }
    // },
    async toContestInfo (row) {
      // console.log(row.id)
      if (!this.$store.getters.getIsLogin) {
        this.$message.warning('登录后才能查看！')
      } else {
        // FIXME: 这里暂时还没详细判断限制条件，暂时注释掉，直接进入
        if (row.status === 1) {
          this.$message.warning('比赛还未开始，不允许查看！')
        } else {
          this.$router.push({
            path: '/ContestInfo',
            query: {
              cid: row.id
            }
          })
        }
      }
      // else {
      //
      // let params = new URLSearchParams()
      // params.append('cid', row.id)
      // params.append('username', this.$store.getters.getUsername)
      // let dataProblemByTitle = await this.$http
      //   .get('/problem/GProblemByTitle', params)
      //   .catch(() => { })
      // console.log(dataProblemByTitle)
      //   if (dataProblemByTitle.data[0] === '该用户已报名') {
      //     this.$router.push({
      //       path: '/ContestInfo',
      //       query: {
      //         cid: row.id
      //       }
      //     })
      //   } else {
      //     this.$message({
      //       message: '请先报名才能进入！',
      //       type: 'error'
      //     })
      //   }
      // } else if (row.ctype === 1 || row.ctype === 2) {
      //   this.$prompt('请输入密码', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消'
      //   })
      //     .then(({
      //       value
      //     }) => {
      //       this.vertifyPassword(value, row.id)
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '取消输入'
      //       })
      //     })
      // } else {
      //   this.$router.push({
      //     path: '/ContestInfo',
      //     query: {
      //       cid: row.id
      //     }
      //   })
      // }
      // }
    }
  }
  // async vertifyPassword (val, val2) {
  //   let params = new URLSearchParams()
  //   params.append('password', val)
  //   params.append('cid', val2)
  //   let {
  //     data
  //   } = await this.$http
  //     .post('/CheckContestPassword', params)
  //     .catch(() => {
  //       this.$message({
  //         message: '服务器繁忙，请稍后再试！',
  //         type: 'error'
  //       })
  //     })
  //   if (data.data[0] === '密码输入错误') {
  //     this.$message({
  //       message: data.data[0],
  //       type: 'error'
  //     })
  //   } else {
  //     // add by axiang [20190618] 变量定义后从未使用，出错，待修改，先注释掉
  //     // this.$router.push({ path: '/ContestInfo', query: { cid: row.id } })
  //   }
  // },
}

</script>
<style scoped>
.contest-body {
  width: 90%;
  /* padding-top: 5%; */
  margin: auto;
  margin-bottom: 10%;
  font-family: 微软雅黑, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.box-card {
  width: 90%;
  height: 100%;
  min-height: 500px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.contest-head {
  background-color: #f5f5f5;
  height: 20px;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid #eeeeee;
  padding: 10px 15px;
  display: block;
}

.contest-filter {
  margin: 0;
  padding: 10px 15px;
  border-bottom: 1px solid #eeeeee;
  height: 30px;
  width: 100%;
}

.green-font {
  color: green;
  font-weight: bold;
}

.blue-font {
  color: blue;
  font-weight: bold;
}

.black-font {
  color: black;
  font-weight: bold;
}

.gray-font {
  color: gray;
  font-weight: bold;
}

.lightcoral-font {
  color: lightcoral;
  font-weight: bold;
}

.red-font {
  color: red;
  font-weight: bold;
}

.orange-font {
  color: darkorange;
  font-weight: bold;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-input {
  width: 180px;
}
</style>
