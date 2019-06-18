<template>
  <div style="margin:2% 5% 2% 5%">
    <div>
      <h1>{{this.carddata.title}}</h1>
      <h4>TimeLimit:{{this.maindata.timelimit}} MemoryLimit:{{this.maindata.memorylimit?this.maindata.memorylimit:"128MB"}}</h4>
      <h4>64-bit integer IO format:%lld</h4>
      <el-tag type="success" v-if="this.isAc=='true'">
        <i class="el-icon-check" style="color:green;margin-right:10px"></i>已通过
      </el-tag>
      <el-tag type="danger" v-if="this.isAc=='false'">
        <i class="el-icon-close" style="color:red;margin-right:10px"></i>未通过
      </el-tag>
    </div>
    <div style="width:100%;display:inline-flex">
      <div class="card-div">
        <!-- <div style="display:inline-flex;float:left">
                    <h4>未提交 |</h4><h4><i class="el-icon-star"></i> 登录后收藏 |</h4><h4> 已有{{collect_people}}人收藏了本题</h4>
        </div>-->
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
                v-html="this.maindata.dis?this.maindata.dis:'null'"
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
                v-html="this.maindata.input?this.maindata.input:'null'"
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
                v-html="this.maindata.output?this.maindata.output:'null'"
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
                v-html="this.simpledata?this.simpledata.input:'没有例子'"
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
                v-html="this.simpledata?this.simpledata.output:'没有例子'"
              ></div>
            </span>
          </div>
        </el-card>
        <div class="submitDiv" v-if="islogin">
          <div style="display:inline-flex;float:left;width:100%">
            <!-- <div style="width:10%;margin-right:2%"><p>pid</p></div>
            <el-input v-model="pid" :disabled="ture" style="width:35%;margin-right:2%;z-index:1"></el-input>-->
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
      <div style="width:20%;">
        <div style="width:100%;margin-top:25%">
          <el-card style="width: 100%;height: 300px;">
            <div slot="header" class="clearfix">
              <span style="float:left">题目统计信息</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">详细</el-button> -->
            </div>
            <div class="text item">总AC数：{{this.carddata.totalAc}}</div>
            <div class="text item">通过人数：{{this.carddata.totalAcUser}}</div>
            <div class="text item">尝试人数：{{this.carddata.totalSubmitUser}}</div>
            <div class="text item">总提交量：{{this.carddata.totalSubmit}}</div>
            <div class="text item">AC率：{{this.carddata.strRadio}}</div>
          </el-card>
        </div>
        <!-- <div style="width:100%;margin-top:5%">
                        <el-card style="width: 100%;height: 300px;">
                            <div slot="header" class="clearfix">
                                <span style="float:left">标签---1000</span>
                            </div>
                            <div class="text item">
                                AC该题后可以添加标签
                                贴完标签可以获得20ACB。
                                并且可以获得本题所有提交代码查看权限。
                                点击标题可以显示标签。
                                如果你还没认真思考过这题，请不要查看标签
                                如果您已经通过了该题，请务为该题贴上标签
                            </div>
                        </el-card>
        </div>-->
        <!-- <div style="width:100%;margin-top:5%">
                        <el-card style="width: 100%;height: 300px;">
                            <div slot="header" class="clearfix">
                                <span style="float:left">出处</span>
                            </div>
                            <div class="text item">
                                第一届FZU Code Carnival 校内选拔 报名转用(请在队名前注明年级)
                            </div>
                        </el-card>
        </div>-->
      </div>
    </div>
    <div style="padding:0 0 2% 0;" v-if="islogin">
      <el-button @click="onSubmit" style="width:20%;background:#D3D3D3">Submit</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
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
          value: 'JAVA',
          label: 'JAVA'
        }
      ],
      code: '',
      islogin: '',
      maindata: [],
      carddata: [],
      simpledata: [],
      compileLanguage: 'G++',
      isAc: 'false'
    }
  },
  methods: {
    async getProblem () {
      this.islogin = this.$store.getters.getUsername
      let params = new URLSearchParams()
      params.append('pid', this.$route.query.pid)
      params.append('user', this.$store.getters.getUsername)
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
      // console.log(isAc)
    },
    async onSubmit () {
      if (this.code.length > 50) {
        let params = new URLSearchParams()
        params.append('pid', this.$route.query.pid)
        params.append('user', this.$store.getters.getUsername)
        params.append('code', this.code)
        params.append('language', this.compileLanguage)
        // let dataSubmitProblem = await this.$http
        //   .post('/submit/submitProblem', params)
        //   .catch(() => {
        //     this.$message({
        //       message: '服务器繁忙，请稍后再试！',
        //       type: 'error'
        //     })
        //   })
        this.$router.push({ path: '/Status' })
      } else {
        this.$message({ message: '提交长度过少！', type: 'error' })
      }
    }
  },
  mounted () {
    this.getProblem()
  }
}
</script>

<style scoped>
.card-div {
  width: 70%;
  margin: 2% 5% 2% 5%;
  padding: 0;
}

.list-div {
  width: 100%;
  margin: 2% 0 2% 0;
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

.el-row {
  margin-bottom: 20px;
}
</style>
