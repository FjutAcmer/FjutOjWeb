<template>
  <!-- FIXME: add by axiang [20190702] 交互性不明确，显示的内容不全面，功能不完整。建议重构，计划中-->
  <div class="contest">
    <el-card :body-style="{ padding: '0px' }" class="box-card">
      <div class="contest-head">
        <div style="float:left">比赛列表</div>
      </div>
      <div class="contest-filter">
        <el-row type="flex">
          <!-- <el-col :span="4">
              <el-input placeholder="请输入内容" size="mini">
              <template slot="prepend">名称</template>
              </el-input>
          </el-col>-->
          <!-- FIXME: add by axiang [20190703] 筛选框是假的 -->
          <el-col style="width:20%">
            <el-select placeholder="请选择权限" size="mini"></el-select>
          </el-col>
          <el-col style="width:20%">
            <el-select placeholder="请选择状态" size="mini"></el-select>
          </el-col>
          <el-col style="width:10%">
            <el-button icon="el-icon-search" type="primary" size="mini" @click="getSearch(1)">筛选</el-button>
          </el-col>
        </el-row>
      </div>
      <el-pagination style="float:left" layout="prev, pager, next" :current-page="currentPage" @current-change="getList"
        :total="currentTotal/10"></el-pagination>
      <el-table style="width:100%;" :data="tableData">
        <el-table-column prop="id" label="#" width="150"></el-table-column>
        <el-table-column label="名称" width="400">
          <template slot-scope="scope">
            <div @click="toContestInfo(scope.row)">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" label="开始时间" style="width:30%"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" style="width:30%"></el-table-column>
        <!-- <el-table-column label="权限" style="width:30%">
          <template slot-scope="scope">
              <div style="color:green" v-if="scope.row.ctype==0">公开</div>
              <div style="color:green" v-if="scope.row.ctype==1" >密码</div>
              <div style="color:purple" v-if="scope.row.ctype==2" >私有</div>
              <div style="color:blue" v-if="scope.row.ctype==3" @click="toSignUp(scope.row)">注册</div>
              <div style="color:darkorange" v-if="scope.row.ctype==4">正式</div>
              <div style="color:darkorange" v-if="scope.row.ctype==5">组队</div>
          </template>
        </el-table-column>-->
        <el-table-column label="状态" style="width:30%">
          <template slot-scope="scope">
            <div style="color:green" v-if="scope.row.status==0">正在进行</div>
            <div style="color:blue" v-if="scope.row.status==1">未开始</div>
            <div style="color:red" v-if="scope.row.status==2">已结束</div>
          </template>
        </el-table-column>
        <el-table-column label="类型" style="width:30%">
          <template slot-scope="scope">
            <div style="color:green" v-if="scope.row.kind==0">练习</div>
            <div style="color:blue" v-if="scope.row.kind==1">积分</div>
            <div style="color:black" v-if="scope.row.kind==2">趣味</div>
            <div style="color:gray" v-if="scope.row.kind==3">正式</div>
            <div style="color:red" v-if="scope.row.kind==4">DIY</div>
            <div style="color:green" v-if="scope.row.kind==5">练习</div>
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
      isSearch: false
    }
  },
  methods: {
    async getContest (val) {
      this.tableData = []
      let params = new URLSearchParams()
      params.append('pagenum', val)
      this.currentPage = val
      let dataAllContest = await this.$http
        .post('/GAllContest', params)
        .catch(() => {
          this.$message({
            message: '服务器繁忙，请稍后再试！',
            type: 'error'
          })
        })
      this.currentTotal = dataAllContest.data[0]
      // console.log(this.currentTotal)
      this.tableData = dataAllContest.data[1]
      // console.log(this.tableData)
    },
    toSignUp (row) {
      // console.log(row.id)
      if (this.$store.getters.getUsername === '') {
        this.$message({
          message: '请先登录！',
          type: 'error'
        })
        // return
      } else if (row.status === 2) {
        this.$message({
          message: '比赛已经结束，不能报名！',
          type: 'error'
        })
      } else if (row.status === 0) {
        this.$message({
          message: '比赛已开始，不能报名！',
          type: 'error'
        })
      } else {
        this.$router.push({
          path: '/ContestSignUp',
          query: {
            cid: row.id
          }
        })
      }
    },
    async toContestInfo (row) {
      // console.log(row.id)
      if (this.$store.getters.getUsername === '') {
        this.$message({
          message: '请先登录！',
          type: 'error'
        })
      } else if (row.status === 2) {
        this.$message({
          message: '比赛已经结束，不能进入！',
          type: 'error'
        })
      } else if (row.status === 1) {
        this.$message({
          message: '比赛未开始，不能进入！',
          type: 'error'
        })
      } else if (row.ctype === 3 || row.ctype === 4 || row.ctype === 5) {
        let params = new URLSearchParams()
        params.append('cid', row.id)
        params.append('username', this.$store.getters.getUsername)
        let dataProblemByTitle = await this.$http
          .post('/problem/GProblemByTitle', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
            // return
          })
        if (dataProblemByTitle.data[0] === '该用户已报名') {
          this.$router.push({
            path: '/ContestInfo',
            query: {
              cid: row.id
            }
          })
        } else {
          this.$message({
            message: '请先报名才能进入！',
            type: 'error'
          })
        }
      } else if (row.ctype === 1 || row.ctype === 2) {
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(({
            value
          }) => {
            this.vertifyPassword(value, row.id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            })
          })
      } else {
        this.$router.push({
          path: '/ContestInfo',
          query: {
            cid: row.id
          }
        })
      }
    },
    async getSearch (val) {
      if (this.input !== null) {
        this.currentPage = val
        this.isSearch = true
        let params = new URLSearchParams()
        params.append('title', this.input)
        params.append('pagenum', this.currentPage)
        let dataProblemByTitle = await this.$http
          .post('/problem/GProblemByTitle', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
          })
        this.currentTotal = dataProblemByTitle.data[0]
        this.tableData = dataProblemByTitle.data[1]
      }
    },
    async vertifyPassword (val, val2) {
      let params = new URLSearchParams()
      params.append('password', val)
      params.append('cid', val2)
      let {
        data
      } = await this.$http
        .post('/CheckContestPassword', params)
        .catch(() => {
          this.$message({
            message: '服务器繁忙，请稍后再试！',
            type: 'error'
          })
        })
      if (data.data[0] === '密码输入错误') {
        this.$message({
          message: data.data[0],
          type: 'error'
        })
      } else {
        // add by axiang [20190618] 变量定义后从未使用，出错，待修改，先注释掉
        // this.$router.push({ path: '/ContestInfo', query: { cid: row.id } })
      }
    },
    getList (val) {
      if (this.isSearch) {
        this.getSearch(val)
      } else {
        this.getContest(val)
      }
    }
  },
  mounted () {
    this.getContest(this.currentPage)
  }
}

</script>
<style scoped>
.contest {
  width: 90%;
  padding-top: 5%;
  margin-bottom: 10%;
  margin-left: 5%;
  margin-right: 5%;
  display: block;
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

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-input {
  width: 180px;
}
</style>
