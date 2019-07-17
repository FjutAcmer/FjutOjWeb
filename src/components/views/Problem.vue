<template>
  <div class="problem-body">
    <el-card class="box-card">
      <div slot="header">
        题目列表
      </div>
      <div class="function-bar">
        <el-checkbox
          class="bar-search-item"
          v-model="myCollection"
        >我的收藏</el-checkbox>
        <el-input
          v-model="searchTitle"
          class="bar-search-item-input"
          size="mini"
          placeholder="请输入标题"
        >
          <template slot="prepend">标题</template>
        </el-input>
        <el-select
          v-model="searchTag"
          class="bar-search-item-select"
          size="mini"
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in problemTags"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button
          size="mini"
          class="bar-search-item"
          type="primary"
          icon="el-icon-search"
          @click="handleSelect"
        >筛选</el-button>
        <el-button
          size="mini"
          class="bar-search-item"
          type="info"
          icon="el-icon-s-grid"
          @click="handleBackToAll"
        >查看全部</el-button>
      </div>
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :current-page="this.currentPage"
        @current-change="switchPage"
        :total="this.total"
        :page-size="50"
      ></el-pagination>
      <el-table
        style="width:100%;"
        :data="this.tableData"
        v-loading="loading"
      >
        <el-table-column
          label="是否解决"
          width="100"
        >
          <template slot-scope="scope">
            <span :class="scope.row.isSolved==='✔'?'success-row':scope.row.isSolved==='✘'?'error-row':''">{{scope.row.isSolved}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="#"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="Title"
          label="题目标题"
          width="600"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="toSubmit(scope.row.id)"
            >{{scope.row.Title}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="Ratio"
          label="通过率（通过人数/总提交数）"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myCollection: false,
      searchTitle: '',
      searchTag: '',
      problemTags: [],
      currentPage: 1,
      total: 0,
      tableData: [],
      problemSolveMap: new Map(),
      isSearch: false,
      loading: false

    }
  },
  created () {
    this.getProlem()
    this.getProblemTags()
  },
  mounted () {
  },
  methods: {
    switchPage (val) {
      this.currentPage = val
      this.getProlem()
    },
    handleSelect () {
      this.currentPage = 1
      this.getProlem()
    },
    handleBackToAll () {
      this.currentPage = 1
      this.myCollection = false
      this.searchTitle = ''
      this.searchTag = ''
      this.getProlem()
    },
    toSubmit (pid) {
      this.$router.push({ path: '/Submit', query: { pid: pid } })
    },
    // add by axiang [20190714] 船新升级版逻辑，将筛选逻辑放在后端去做
    async getProlem () {
      this.loading = true
      let params = new URLSearchParams()
      params.append('pageNum', this.currentPage)
      params.append('tagId', this.searchTag)
      params.append('title', this.searchTitle)
      params.append('username', this.$store.getters.getUsername)
      params.append('isStar', this.myCollection)
      let dataProblemsByPage = await this.$http
        .get('/problem/getProblems', params)
        .catch(() => {
          this.loading = false
        })
      this.tableData = []
      let tableDataTemp = dataProblemsByPage.datas[0]
      this.total = dataProblemsByPage.datas[1]
      if (this.problemSolveMap.size === 0) {
        await this.getProblemSovle()
      }
      for (let i = 0; i < tableDataTemp.length; i++) {
        let isSolvedTemp = this.problemSolveMap.get(tableDataTemp[i].pid) === 0 ? '✘'
          : this.problemSolveMap.get(tableDataTemp[i].pid) === 1 ? '✔' : undefined
        this.tableData.push({
          isSolved: isSolvedTemp,
          // isSolved: this.problemSolveMap.get(tableDataTemp[i].pid),
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
      this.loading = false
    },
    async getProblemSovle () {
      let params = new URLSearchParams()
      params.append('username', this.$store.getters.getUsername)
      let dataProblemSolve = await this.$http.get('/problem/getProblemSolve', params)
      let dataTempSolve = dataProblemSolve.datas[0]
      let map = new Map()
      for (let i = 0; i < dataTempSolve.length; i++) {
        map.set(dataTempSolve[i].pid, dataTempSolve[i].solved)
      }

      this.problemSolveMap = map
      console.log(this.problemSolveMap.values())
      console.log(this.problemSolveMap)
    },
    async getProblemTags () {
      let params = new URLSearchParams()
      let dataProblemTags = await this.$http
        .get('/problemTag/getAllProblemTag', params)
      let dataTempTags = dataProblemTags.datas[0]
      dataTempTags.unshift({
        id: '',
        name: '-'
      })
      this.problemTags = dataTempTags
    }

  }
}
</script>

<style scoped>
.problem-body {
  width: 100%;
  min-height: 700px;
  padding-top: 0;
  margin: 0;
  margin-bottom: 20px;
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

.function-bar {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eeeeee;
  /* background-color: aqua; */
}

.bar-search-item-input {
  float: left;
  width: 250px;
  margin-right: 20px;
}

.bar-search-item-select {
  float: left;
  width: 200px;
  margin-right: 20px;
}

.bar-search-item {
  float: left;
}

.search-button {
  float: left;
}

.el-pagination {
  float: left;
}

.success-row {
  font-weight: bold;
  color: green;
}

.error-row {
  font-weight: bold;
  color: red;
}
</style>
