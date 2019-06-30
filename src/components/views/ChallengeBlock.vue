<template>
  <div class="block-box">
    <el-card :body-style="{ padding: '0px' }" class="box-card">
      <div class="block-head">
        <div class="title">挑战模式</div>
        <div class="title">模块：【{{this.blockDetail.name}}】</div>
      </div>
      <div class="block-description">
        <el-collapse v-model="defopen">
          <el-collapse-item name="1">
            <template slot="title">
              <div class="des-title">模块说明</div>
            </template>
            <div class="des-detail" v-html="this.blockDetail.des">{{this.blockDetail.des}}</div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <div class="des-title">模块类型</div>
            </template>
            <div class="des-detail">{{this.blockDetail.type}}</div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <div class="des-title">开启条件</div>
            </template>
            <div
              class="des-detail"
              v-html="this.blockDetail.condition"
            >{{this.blockDetail.condition}}</div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template slot="title">
              <div class="des-title">我的状态</div>
            </template>
            <div class="des-detail">
              <div class="solving-progress">
                完成进度：({{this.blockDetail.getScore}}/{{this.blockDetail.totalScore}})：<el-progress :text-inside="true" :stroke-width="20" :percentage="10" :color="this.customColorMethod"></el-progress>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="5">
            <template slot="title">
              <div class="des-title">题目列表</div>
            </template>
            <div>
              <el-pagination
                class="bar-pagination"
                layout="total, prev, pager, next, jumper"
                :total="this.totalCol"
              ></el-pagination>
              <el-table style="width:100%;" :data="this.tableData">
                <el-table-column prop="solved" label="是否解决" :formatter="formatBoolean" width="150"></el-table-column>
                <!-- <el-table-column prop="pid" label="模块题号" width="150"></el-table-column> -->
                <el-table-column prop="trueProblemId" label="#" width="150"></el-table-column>
                <el-table-column prop="title" label="标题" width="750">
                  <template slot-scope="scope">
                    <div style="cursor:pointer;color:blue">{{scope.row.title}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="score" label="积分"></el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      // FIXME:后端还没做好，拿的计数数据是错误的
      totalCol: 0,
      defopen: ['1', '2', '3', '4', '5'],
      blockDetail: {
        id: '',
        name: '未找到',
        des: '',
        type: '',
        condition: '',
        totalScore: 0,
        getScore: 0
      },
      currentPage: 1
    }
  },
  mounted () {
    this.getBlockDetail(this.$route.query.id)
    this.getPerCondition(this.$route.query.id)
    this.getBlockProblems(this.$route.query.id, this.currentPage)
  },
  methods: {
    customColorMethod (percentage) {
      if (percentage < 30) {
        return '#909399'
      } else if (percentage < 100) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },
    async getBlockDetail (blockId) {
      let params = new URLSearchParams()
      this.logger.p({ blockId: blockId })
      params.append('blockId', blockId)
      params.append('username', this.$store.getters.getUsername)
      let dataBlockDetail = await this.$http
        .post('/challenge/getBlockDetail', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      console.log(dataBlockDetail)
      if (dataBlockDetail.code === 100) {
        let dataBlockTemp = dataBlockDetail.datas[0]
        this.blockDetail.getScore = dataBlockDetail.datas[1]
        this.blockDetail.id = dataBlockTemp.id
        this.blockDetail.name = dataBlockTemp.name
        this.blockDetail.des = dataBlockTemp.des
        this.blockDetail.type = dataBlockTemp.type
        this.blockDetail.totalScore = dataBlockTemp.totalScore
      } else {
        this.$message({ message: '获取本模块详情失败！ ', type: 'error' })
      }
      console.log(this.blockDetail)
    },
    async getPerCondition (blockId) {
      let res = ''
      let params = new URLSearchParams()
      params.append('blockId', blockId)
      let dataBlockCondition = await this.$http
        .post('/challenge/getConditionByBlockId', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      if (dataBlockCondition.code === 100) {
        let dataTemp = dataBlockCondition.datas[0]
        if (typeof dataTemp === 'undefined') {
          res = '无条件解锁<br>'
        } else {
          for (let i = 0; i < dataTemp.length; i++) {
            res += `在模块【${dataTemp[i].name}】中获得【${
              dataTemp[i].num
            } 分】<br>`
          }
        }
      } else {
        res = '获取解锁条件错误！'
      }
      this.blockDetail.condition = res
    },
    async getBlockProblems (blockId, pageNum) {
      let params = new URLSearchParams()
      params.append('blockId', blockId)
      params.append('pageNum', pageNum)
      let dataBlockProblems = await this.$http
        .post('/challenge/getBlockProblems', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      if (dataBlockProblems.code === 100) {
        this.tableData = dataBlockProblems.datas[0]
        this.totalCol = dataBlockProblems.datas[1]
        // console.log(this.tableData)
        let total = 0
        for (let i = 0; i < this.tableData.length; i++) {
          total += this.tableData[i].score
        }
        this.blockDetail.totalScore = total
        this.logger.i(this.totalScore)
      } else if (dataBlockProblems.code === 200) {
        this.$message({ message: '本模块没有题目！', type: 'warning' })
      } else {
        this.$message({ message: '获取题目失败！', type: 'error' })
      }
    },

    // add by axiang [20190628] 布尔值格式化：cellValue为后台返回的值
    formatBoolean: function (row, column, cellValue) {
      let ret = '' // 你想在页面展示的值
      if (cellValue) {
        ret = '✔' // 根据自己的需求设定
      } else {
        ret = '✘'
      }
      return ret
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 90%;
  height: 100%;
  min-height: 800px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.block-head {
  background-color: #f5f5f5;
  height: 35px;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid #eeeeee;
  padding: 10px 15px;
  display: block;
}

.title {
  height: 100%;
  float: left;
  font-size: 22px;
  margin-right: 20px;
}

.block-description {
  min-height: 300px;
  width: 100%;
  height: auto;
}

.des-title {
  font-size: 17px;
  margin-left: 20px;
  font-weight: bolder;
}

.des-detail {
  font-size: 16px;
  text-align: left;
  padding-left: 80px;
  padding-right: 80px;
}

.solving-progress{
  width: 50%
}

.bar-pagination {
  margin-left: 20px;
  float: left;
}
</style>
