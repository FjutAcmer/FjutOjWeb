<template>
<!-- TODO: add by axiang [20190702] 交互很糟糕，没有颜色区分 -->
  <div class="docker">
    <el-card :body-style="{ padding: '0px' }" class="box-card">
      <div slot="header" class="clearfix">校集训队荣誉榜</div>
      <div class="functionBar">
        <el-pagination
          class="pagination"
          layout="prev, pager, next"
          :current-page="currentPage"
          @current-change="getHonorRank"
          :total="this.currentTotal*10"
        ></el-pagination>
      </div>
      <el-table style="width:100%;" :data="this.tableData" highlight-current-row>
        <el-table-column prop="id" label="#" width="100"></el-table-column>
        <el-table-column prop="time" label="时间" width="150"></el-table-column>
        <el-table-column prop="name1" label="队员1" width="100"></el-table-column>
        <el-table-column prop="name2" label="队员2" width="100"></el-table-column>
        <el-table-column prop="name3" label="队员3" width="100"></el-table-column>
        <el-table-column prop="contestLevelStr" label="级别" width="200"></el-table-column>
        <el-table-column prop="awardsLevelStr" label="奖项" width="150"></el-table-column>
        <el-table-column prop="text" label="备注"></el-table-column>
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
      isSearch: false
    }
  },
  methods: {
    async getHonorRank (val) {
      this.tableData = []
      let params = new URLSearchParams()
      params.append('pagenum', val)
      this.currentPage = val
      let dataTeamMemberInfo = await this.$http
        .post('/addContestAward/GAllTeamMemberInfo', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.currentTotal = dataTeamMemberInfo.data[0]
      // console.log(this.currentTotal)
      this.tableData = dataTeamMemberInfo.data[1]
    }
  },
  mounted () {
    this.getHonorRank(this.currentPage)
  }
}
</script>
<style scoped>
.docker {
  margin: 2% 5% 2% 5%;
  width: 90%;
  min-height: 600px;
  padding: 0;
}

.box-card {
  width: 90%;
  height: 100%;
  min-height: 500px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  margin-top: 2%;
  margin-bottom: 2%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.functionBar {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 50px;
  border-bottom: 1px solid silver;
}

.pagination {
  float: left;
  margin-left: 10px;
  height: 30px;
  margin-top: 10px;
}

.input {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  height: 30px;
  width: 200px;
}

.button {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  height: 30px;
  width: 50px;
}
</style>
