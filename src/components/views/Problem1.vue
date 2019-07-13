<template>
  <!-- TODO: add by axiang [20190702] 修改富文本显示，让代码变得有颜色 -->
  <div class="problem">
    <el-card
      :body-style="{ padding: '0px' }"
      class="box-card"
    >
      <div slot="header">题目列表</div>
      <div class="problem-filter">
        <el-row type="flex">
          <!-- <el-col style="width:10%">
                        <el-checkbox>我的收藏</el-checkbox>
          </el-col>-->
          <el-col style="width:20%">
            <el-input
              v-model="input"
              placeholder="请输入标题"
              size="mini"
            >
              <template slot="prepend">标题</template>
            </el-input>
          </el-col>
          <!-- <el-col style="width:20%">
                        <el-select placeholder="请选择标签" size="mini">
                        </el-select>
          </el-col>-->
          <el-col style="width:10%;x">
            <el-button
              icon="el-icon-search"
              type="primary"
              size="mini"
              @click="getSearch(1)"
            >搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        style="float:left"
        layout="total, prev, pager, next, jumper"
        :current-page="currentPage"
        @current-change="getList"
        :total="this.currentTotal*10"
      ></el-pagination>
      <el-table
        style="width:100%;"
        :data="this.tableData"
        v-loading="loading"
      >
        <el-table-column
          prop="id"
          label="#"
          style="width:10%"
        ></el-table-column>
        <el-table-column
          prop="Title"
          label="题目标题"
          style="width:60%"
        >
          <template slot-scope="scope">
            <div
              style="cursor:pointer;color:blue"
              @click="toSubmit(scope.row)"
            >{{scope.row.Title}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="Ratio"
          label="AC率（通过人数/总提交数）"
          style="width:30%"
        ></el-table-column>
      </el-table>
    </el-card>
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap">
    </el-backtop> -->
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
      loading: true
    }
  },
  methods: {
    async getProlem (val) {
      this.tableData = []
      let params = new URLSearchParams()
      params.append('pagenum', val)
      this.currentPage = val
      let dataProblemsByPage = await this.$http
        .get('/problem/getProblems', params)
      this.loading = false
      this.currentTotal = dataProblemsByPage.datas[0]
      // console.log(this.currentTotal);
      let tableDataTemp = dataProblemsByPage.datas[1]
      for (let i = 0; i < tableDataTemp.length; i++) {
        this.tableData.push({
          id: tableDataTemp[i].pid,
          Title: tableDataTemp[i].title,
          Ratio: tableDataTemp[i].strRadio +
            '(' +
            tableDataTemp[i].totalAcUser +
            '/' +
            tableDataTemp[i].totalSubmit +
            ')'
        })
      }
      // console.log(this.tableData)
    },
    toSubmit (row) {
      // console.log(row.id)
      this.$router.push({ path: '/Submit', query: { pid: row.id } })
    },
    async getSearch (val) {
      if (this.input !== null) {
        this.currentPage = val
        this.isSearch = true
        let params = new URLSearchParams()
        params.append('title', this.input)
        params.append('pagenum', this.currentPage)
        let dataProblemByTitle = await this.$http
          .get('/problem/getProblemByTitle', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
            // return
          })
        console.log(dataProblemByTitle)
        this.loading = false
        this.tableData = []
        this.currentTotal = dataProblemByTitle.datas[0]
        let tableDataTemp = dataProblemByTitle.datas[1]
        for (let i = 0; i < tableDataTemp.length; i++) {
          this.tableData.push({
            id: tableDataTemp[i].pid,
            Title: tableDataTemp[i].title,
            Ratio: tableDataTemp[i].strRadio +
              '(' +
              tableDataTemp[i].totalAcUser +
              '/' +
              tableDataTemp[i].totalSubmit +
              ')'
          })
        }
      }
    },
    getList (val) {
      if (this.isSearch) {
        this.loading = true
        this.getSearch(val)
      } else {
        this.loading = true
        this.getProlem(val)
      }
    }
  },
  mounted () {
    this.getProlem(this.currentPage)
  }
}
</script>

<style scoped>
.problem {
  width: 100%;
  min-height: 700px;
  padding-top: 0;
  margin: 0;
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

.problem-filter {
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
