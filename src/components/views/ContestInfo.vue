<template>
  <div class="docker">
    <el-tabs
      v-model="tableTabValue"
      @tab-click="handleClick"
      type="border-card"
      tab-position="top"
      class="tab"
    >
      <el-tab-pane label="主页" name="1">
        <el-card class="box-card">
          <div slot="header">
            <div style="width:20%;float:left">#</div>
            <div style="width:80%;float:left">Title</div>
            <!-- <div style="width:10%;float:left">AC</div> -->
          </div>
          <div v-for="(o,index) in contestProblem" :key="o" class="text item">
            <div style="width:100%;display:inline-flex;">
              <div style="width:20%;">{{index+1}}</div>
              <div style="width:80%;float:left">{{o.title}}</div>
              <!-- <i v-if="o" class="el-icon-check"></i> -->
              <!-- <div style="width:30%;float:left">{{o.totalAcUser}}/{{o.totalSubmit}}</div> -->
            </div>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="题目描述" name="2">
        <div v-for="(o,index) in contestProblem" :key="o" style="display:inline-flex;margin:0px">
          <el-button @click="getProblem(o.tpid)">{{index+1}}</el-button>
        </div>
        <div style="margin:2% 5% 2% 5%">
          <div>
            <!-- <h1>{{carddata.title}}</h1> -->
            <el-tag type="success" v-if="isAc">
              <i class="el-icon-check" style="color:green;margin-right:10px"></i>已通过
            </el-tag>
            <el-tag type="danger" v-if="!isAc">
              <i class="el-icon-close" style="color:red;margin-right:10px"></i>未通过
            </el-tag>
            <h4>TimeLimit:{{maindata.timelimit}} MemoryLimit:{{maindata.memorylimit?maindata.memorylimit:"128MB"}}</h4>
            <h4>64-bit integer IO format:%lld</h4>
          </div>
          <div style="width:100%;display:inline-flex">
            <div class="card-div">
              <el-card class="list-div">
                <div class="clearfix">
                  <span style="float:left;">
                    <h2>Description</h2>
                  </span>
                </div>
                <div class="text item">
                  <span style="float:left">
                    <div
                      style="text-align:left;font-size:20px;margin-bottom:10px;"
                      v-html="maindata.dis?maindata.dis:'null'"
                    ></div>
                  </span>
                </div>
              </el-card>
              <el-card class="list-div">
                <div class="clearfix">
                  <span style="float:left;">
                    <h2>Input</h2>
                  </span>
                </div>
                <div class="text item">
                  <span style="float:left">
                    <div
                      style="text-align:left;font-size:20px;margin-bottom:10px;"
                      v-html="maindata.input?maindata.input:'null'"
                    ></div>
                  </span>
                </div>
              </el-card>
              <el-card class="list-div">
                <div class="clearfix">
                  <span style="float:left">
                    <h2>Output</h2>
                  </span>
                </div>
                <div class="text item">
                  <span style="float:left">
                    <div
                      style="text-align:left;font-size:20px;margin-bottom:10px;"
                      v-html="maindata.output?maindata.output:'null'"
                    ></div>
                  </span>
                </div>
              </el-card>
              <el-card class="list-div">
                <div class="clearfix">
                  <span style="float:left">
                    <h2>SampleInput</h2>
                  </span>
                </div>
                <div class="text item">
                  <span style="float:left">
                    <div
                      style="text-align:left;font-size:20px"
                      v-html="simpledata?simpledata.input:'没有例子'"
                    ></div>
                  </span>
                </div>
              </el-card>
              <el-card class="list-div">
                <div class="clearfix">
                  <span style="float:left">
                    <h2>SampleOutput</h2>
                  </span>
                </div>
                <div class="text item">
                  <span style="float:left">
                    <div
                      style="text-align:left;font-size:20px;margin-bottom:10px;padding-right:10px"
                      v-html="simpledata?simpledata.output:'没有例子'"
                    ></div>
                  </span>
                </div>
              </el-card>
              <div class="submitDiv">
                <div style="display:inline-flex;float:left;width:100%">
                  <div style="width:10%;margin-right:2%">
                    <p>language</p>
                  </div>
                  <el-select v-model="compileLanguage" style="width:20%;margin-right:2%;z-index:1">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <el-row>
                  <el-col :span="24">
                    <el-input type="textarea" rows="20" placeholder="code" v-model="code"></el-input>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div style="padding:0 0 2% 0;">
            <el-button @click="onSubmit" style="width:20%;background:#D3D3D3">Submit</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="在线测试" name="3">
        <el-card :body-style="{ padding: '0px' }" class="box-card">
          <el-pagination
            style="float:left"
            layout="prev, pager, next"
            :current-page="currentPage"
            @current-change="getContestStatu"
            :total="currentTotal*10"
          ></el-pagination>
          <el-table style="width:100%;" :data="this.tableData">
            <el-table-column prop="id" label="#" style="width:3%"></el-table-column>
            <el-table-column prop="ruser" label="昵称" style="width:20%"></el-table-column>
            <el-table-column prop="pid" label="题目" style="width:2%">
              <!-- <template slot-scope="scope"><div @click="toSubmit(scope.row)">{{scope.row.pid}}</div> </template> -->
            </el-table-column>
            <el-table-column label="评测结果" style="width:20%">
              <template slot-scope="scope">
                <el-tag
                  size="medium"
                  type="success"
                  v-show="scope.row.result==1"
                >{{ scope.row.otherinfo }}</el-tag>
                <el-tag
                  size="medium"
                  v-show="scope.row.result==0||scope.row.result==10||scope.row.result==12||scope.row.result==13"
                >{{ scope.row.otherinfo }}</el-tag>
                <el-tag
                  size="medium"
                  @click="getInfo(scope.row)"
                  type="danger"
                  v-show="scope.row.result==2||scope.row.result==3||scope.row.result==4||scope.row.result==5
                                    ||scope.row.result==6||scope.row.result==7||scope.row.result==8||scope.row.result==11"
                >{{ scope.row.otherinfo }}</el-tag>
                <el-tag
                  size="medium"
                  type="warning"
                  v-show="scope.row.result==9"
                >{{ scope.row.otherinfo }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="语言" style="width:5%">
              <template slot-scope="scope">
                <div @click="toCodeView(scope.row)">{{scope.row.submitlanguage}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="timeUsed" label="耗时" style="width:5%"></el-table-column>
            <el-table-column prop="memoryUsed" label="使用内存" style="width:5%"></el-table-column>
            <el-table-column prop="codelen" label="代码长" style="width:5%"></el-table-column>
            <el-table-column prop="submitTime" label="提交时间" style="width:35%"></el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="实时排名" name="4">
        <el-card class="box-card">
          <div slot="header">
            <div style="width:20%;float:left">Rank</div>
            <div style="width:50%;float:left">Nick</div>
            <div style="width:30%;float:left">acnum</div>
          </div>
          <div v-for="(o,index) in contestRank" :key="o" class="text item">
            <div style="width:100%;display:inline-flex;">
              <div style="width:20%;">{{o.acnum!=-1?index+1:''}}</div>
              <div style="width:50%;float:left">{{o.username}}</div>
              <div style="width:30%;float:left">{{o.acnum}}</div>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableTabValue: '1',
      currentPage: 1,
      currentTotal: 0,
      tableData: [],
      contestProblem: '',
      contestRank: '',
      isAc: false,
      options: [
        {
          value: 'G++',
          label: 'G++'
        },
        {
          value: 'GCC',
          label: 'GCC'
        },
        {
          value: 'Pascal',
          label: 'Pascal'
        },
        {
          value: 'C#',
          label: 'C#'
        },
        {
          value: 'JAVA',
          label: 'JAVA'
        }
      ],
      code: '',
      maindata: [],
      carddata: [],
      simpledata: [],
      compileLanguage: '',
      pid: ''
    }
  },
  methods: {
    async getContestProblem () {
      let params = new URLSearchParams()
      params.append('cid', this.$route.query.cid)
      let dataContestProblem = await this.$http
        .post('/GContestProblem', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      // console.log(data.data[0])
      this.contestProblem = dataContestProblem.data[0]
      // console.log(this.contestProblem[0].tpid)
    },
    toCodeView (row) {
      // console.log(row.id)
      let { href } = this.$router.resolve({
        name: 'CodeView',
        query: {
          id: row.id,
          ruser: row.ruser,
          problem: row.pid,
          languge: row.submitlanguage,
          jadgeStatu: row.otherinfo
        }
      })
      window.open(href, '_blank')
    },
    async getInfo (row) {
      let params = new URLSearchParams()
      params.append('rid', row.id)
      let dataCeinfo = await this.$http
        .post('/ceinfo/GCeinfo', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
          // return
        })
      this.$message({
        dangerouslyUseHTMLString: true,
        message:
          'rid:' + dataCeinfo.data[0].rid + '  info:' + dataCeinfo.data[0].info,
        showClose: true,
        duration: 0
      })
    },
    async getContestStatu (val) {
      this.tableData = []
      let params = new URLSearchParams()
      params.append('pagenum', val)
      params.append('cid', this.$route.query.cid)
      this.currentPage = val
      let dataContestStatus = await this.$http
        .post('/GContestStatus', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      this.tableData = dataContestStatus.data[1]
      this.currentTotal = dataContestStatus.data[0]
    },
    async getContestRank () {
      let params = new URLSearchParams()
      params.append('cid', this.$route.query.cid)
      let dataContestRank = await this.$http
        .post('/GContestRank', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
          // return
        })
      // console.log(data.data[0])
      if (dataContestRank.data[0] === '') {
        this.contestRank = [{ username: '没有用户参加', acnum: -1 }]
      } else {
        this.contestRank = dataContestRank.data[0]
      }
    },
    async getProblem (val) {
      let params = new URLSearchParams()
      params.append('pid', val)
      params.append('user', this.$store.getters.getUsername)
      this.pid = val
      let dataProblemView = await this.$http
        .post('/problemview/Gproblemview', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      // console.log(data)
      this.maindata = dataProblemView.data[0]
      this.carddata = dataProblemView.data[1]
      this.simpledata = dataProblemView.data[2]
      this.isAc = dataProblemView.data[3]
      // console.log(simpledata)
    },
    async onSubmit () {
      if (this.code.length > 50) {
        // FIXME: 需要添加判题逻辑
        let params = new URLSearchParams()
        params.append('pid', this.pid)
        params.append('user', this.$store.getters.getUsername)
        params.append('code', this.code)
        params.append('language', this.compileLanguage)
        params.append('cid', this.$route.query.cid)
        let dataSubmitProblem = await this.$http
          .post('/submit/submitProblem', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
          })
        this.logger.i(dataSubmitProblem.data[0])
        this.tableTabValue = '3'
      } else {
        this.$message({ message: '提交长度过少！', type: 'error' })
      }
    },
    handleClick (tab) {
      if (tab.name === '1') {
        this.getContestProblem()
      } else if (tab.name === '2') {
        this.getProblem(this.contestProblem[0].tpid)
      } else if (tab.name === '3') {
        this.getContestStatu(this.currentPage)
      } else if (tab.name === '4') {
        this.getContestRank()
      }
    }
  },
  mounted () {
    this.getContestProblem()
  }
}
</script>
<style scoped>
.docker {
  width: 100%;
  margin: 0;
  padding: 0;
}

.tab {
  margin: 2% 2% 2% 2%;
  min-height: 700px;
}

.box-card {
  margin: 2% 5% 2% 5%;
  width: 90%;
  min-height: 30%;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.submitDiv {
  width: 100%;
  margin: 4% 0 0 0;
  padding: 0;
}

.card-div {
  width: 90%;
  margin: 2% 5% 2% 5%;
  padding: 0;
}

.list-div {
  width: 100%;
  margin: 2% 0 2% 0;
}
</style>
