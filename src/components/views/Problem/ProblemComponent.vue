<template>
  <div class="problem-body">
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
          <span :class="scope.row.isSolved==='✔'?'success-row':scope.row.isSolved==='?'?'error-row':''">{{scope.row.isSolved}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="#"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="Title"
        label="题目标题"
        width="400"
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
      <el-table-column
        label="题目难度"
        width="150"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.diff==='简单'?'success': scope.row.diff==='中等'? 'warning':'danger'"
            effect="dark"
          > {{scope.row.diff}} </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="题目来源"
        prop="ojid"
        width="150"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      myCollection: false,
      searchTitle: '',
      searchTag: '',
      problemTags: [],
      currentPage: 1,
      total: 0,
      tableData: [],
      problemDiffMap: new Map(),
      problemSolveMap: new Map(),
      isSearch: false,
      loading: false,
      ojIds: [
        { key: '-1', value: '自主出题' },
        { key: '0', value: 'HDU' },
        { key: '1', value: 'BNUOJ' },
        { key: '2', value: 'NBUT' },
        { key: '3', value: 'PKU' },
        { key: '4', value: 'HUST' },
        { key: '5', value: 'CF' },
        { key: '6', value: 'CodeVS' },
        { key: '7', value: '自主出题' },
        { key: '8', value: 'AcDream' },
        { key: '9', value: 'FOJ' },
        { key: '10', value: '自主出题（game）' },
        { key: '11', value: 'CF_Gym' },
        { key: '12', value: '其他' },
        { key: '13', value: 'BZOJ' },
        { key: '14', value: 'ZOJ' },
        { key: '15', value: 'SPOJ' }
      ]
    }
  },
  mounted () {
    // 如果不是显示比赛界面
    this.getProlem()
    this.getProblemTags()
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
      if (this.problemDiffMap.size === 0) {
        await this.getProblemDiff()
      }
      //
      this.getProblemTagRecords()
      //
      for (let i = 0; i < tableDataTemp.length; i++) {
        let isSolvedTemp = this.problemSolveMap.get(tableDataTemp[i].pid) === 0 ? '?'
          : this.problemSolveMap.get(tableDataTemp[i].pid) === 1 ? '✔' : undefined
        let diff = this.problemDiffMap.get(tableDataTemp[i].pid) === 0 ? '简单'
          : this.problemDiffMap.get(tableDataTemp[i].pid) === 1 ? '中等' : '困难'
        this.tableData.push({
          isSolved: isSolvedTemp,
          id: tableDataTemp[i].pid,
          Title: tableDataTemp[i].title,
          Ratio: tableDataTemp[i].strRadio +
            '(' +
            tableDataTemp[i].totalAcUser +
            '/' +
            tableDataTemp[i].totalSubmit +
            ')',
          diff: diff,
          ojid: this.findOjNameById(tableDataTemp[i].ojid)
        })
      }
      this.loading = false
    },
    // 获取用户解答状态
    async getProblemSovle () {
      let params = new URLSearchParams()
      params.append('username', this.$store.getters.getUsername)
      let dataProblemSolve = await this.$http.get('/problem/getProblemSolve', params)
      let dataTempSolve = dataProblemSolve.datas[0]
      for (let i = 0; i < dataTempSolve.length; i++) {
        this.problemSolveMap.set(dataTempSolve[i].pid, dataTempSolve[i].solved)
      }
    },
    // 获取题目难度系数
    async getProblemDiff () {
      let dataProblemDiff = await this.$http.get('/problemDiff/getProblemDiff')
      let dataDiff = dataProblemDiff.datas[0]
      for (let i = 0; i < dataDiff.length; i++) {
        this.problemDiffMap.set(dataDiff[i].pid, dataDiff[i].difficultType)
      }
    },
    async getProblemTags () {
      let params = new URLSearchParams()
      let dataProblemTags = await this.$http
        .get('/problemTag/getAllProblemTag', params)
      let dataTempTags = dataProblemTags.datas[0]
      if (typeof dataTempTags === 'undefined') {
        return
      }
      dataTempTags.unshift({
        id: '',
        name: '-'
      })
      this.problemTags = dataTempTags
    },
    async getProblemTagRecords () {
      // let params = new URLSearchParams()
      // let dataProblemTags = await this.$http
      //   .get('/problemTag/getAllProblemTagRecord', params)
      // let dataTempTags = dataProblemTags.datas[0]
    },
    findOjNameById (value) {
      for (let item of this.ojIds) {
        if (item.key === String(value)) {
          return item.value
        }
      }
      return '未知'
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Submit') {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }
    next()
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
  font-family: 微软雅黑, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.function-bar {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eeeeee;
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
  color: blue;
}
</style>
