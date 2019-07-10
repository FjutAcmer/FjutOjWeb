<template>
  <div class="docker">
    <el-tabs type="border-card" tab-position="left" class="tab">
      <el-tab-pane label="新增题目">
        <div class="title">新增题目</div>
        <div class="form">
          <div class="info">题目ID:</div>
          <el-input class="input" v-model="pid"></el-input>
        </div>
        <div class="form">
          <div class="info">评测系统:</div>
          <el-select v-model="ojvalue" @change="ojChange">
            <el-option v-for="item in ojList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="form">
          <div class="info">标题:</div>
          <div class="input" style="line-height:50px;">{{title}}</div>
        </div>
        <div style="margin-top:5%">
          <el-button @click="getProblemTitle">submit</el-button>
          <el-button @click="addProblem" style="margin-left:5%">add</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新增比赛">
        <div class="title">新增比赛</div>
        <div class="form">
          <div class="info">名称:</div>
          <el-input class="input" v-model="contestName"></el-input>
        </div>
        <div class="form">
          <div class="info">开始时间:</div>
          <el-date-picker
            style="margin-right:10px"
            v-model="startTime"
            format="yyyy 年 MM 月 dd 日"
            type="date"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-time-picker
            v-model="startTime2"
            :picker-options="{
                        selectableRange: '06:00:00 - 22:00:00'}"
            value-format="HH:mm:ss"
            placeholder="起始时间"
          ></el-time-picker>
        </div>
        <div class="form">
          <div class="info">结束时间:</div>
          <el-date-picker
            style="margin-right:10px"
            v-model="endTime"
            format="yyyy 年 MM 月 dd 日"
            type="date"
            placeholder="选择结束时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-time-picker
            v-model="endTime2"
            :picker-options="{
                        selectableRange: '06:00:00 - 22:00:00' }"
            value-format="HH:mm:ss"
            placeholder="起始时间"
          ></el-time-picker>
        </div>
        <!-- <div class="form">
                    <div class="info">报名类型:</div>
                    <el-select v-model="contestTypeValue" @change="contestTypeChange">
                        <el-option v-for="item in contestTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>
                <div class="form">
                    <div class="info">种类:</div>
                    <el-select v-model="kindValue" @change="kindChange">
                        <el-option v-for="item in kindList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
        </div>-->
        <!-- <div class="form">
                    <div class="info">密码:</div>
                    <el-input class="input" v-model="contestPassword"></el-input>
        </div>-->
        <div class="form">
          <div class="info">题目:</div>
          <el-input class="input" v-model="pidList"></el-input>
        </div>
        <div style="margin-top:10px">
          <el-button @click="addContest">submit</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新增奖项">
        <div class="title">新增奖项</div>
        <div class="form">
          <div class="info">日期:</div>
          <el-input class="input" v-model="dateTime"></el-input>
        </div>
        <div class="form">
          <div class="info">用户名1:</div>
          <el-input class="input" v-model="username1"></el-input>
        </div>
        <div class="form">
          <div class="info">姓名1:</div>
          <el-input class="input" v-model="name1"></el-input>
        </div>
        <div class="form">
          <div class="info">用户名2:</div>
          <el-input class="input" v-model="username2"></el-input>
        </div>
        <div class="form">
          <div class="info">姓名2:</div>
          <el-input class="input" v-model="name2"></el-input>
        </div>
        <div class="form">
          <div class="info">用户名3:</div>
          <el-input class="input" v-model="username3"></el-input>
        </div>
        <div class="form">
          <div class="info">姓名3:</div>
          <el-input class="input" v-model="name3"></el-input>
        </div>
        <div class="form">
          <div class="info">比赛级别:</div>
          <el-select v-model="ojvalue" @change="contestLevelChange">
            <el-option
              v-for="item in contestLevelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="form">
          <div class="info">获得奖项:</div>
          <el-select v-model="ojvalue" @change="rewardChange">
            <el-option
              v-for="item in rewardList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="form">
          <div class="info">备注:</div>
          <el-input class="input" v-model="remark"></el-input>
        </div>
        <div style="margin-top:10px">
          <el-button @click="addHonor">submit</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改奖项">
        <div class="title">修改奖项</div>
        <div class="form">
          <div class="info">id:</div>
          <el-input class="input" v-model="id"></el-input>
        </div>
        <div class="form">
          <div class="info">日期:</div>
          <el-input class="input" v-model="dateTime"></el-input>
        </div>
        <div class="form">
          <div class="info">用户名1:</div>
          <el-input class="input" v-model="username1"></el-input>
        </div>
        <div class="form">
          <div class="info">姓名1:</div>
          <el-input class="input" v-model="name1"></el-input>
        </div>
        <div class="form">
          <div class="info">用户名2:</div>
          <el-input class="input" v-model="username2"></el-input>
        </div>
        <div class="form">
          <div class="info">姓名2:</div>
          <el-input class="input" v-model="name2"></el-input>
        </div>
        <div class="form">
          <div class="info">用户名3:</div>
          <el-input class="input" v-model="username3"></el-input>
        </div>
        <div class="form">
          <div class="info">姓名3:</div>
          <el-input class="input" v-model="name3"></el-input>
        </div>
        <div class="form">
          <div class="info">比赛级别:</div>
          <el-select v-model="ojvalue" @change="contestLevelChange">
            <el-option
              v-for="item in contestLevelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="form">
          <div class="info">获得奖项:</div>
          <el-select v-model="ojvalue" @change="rewardChange">
            <el-option
              v-for="item in rewardList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="form">
          <div class="info">备注:</div>
          <el-input class="input" v-model="remark"></el-input>
        </div>
        <div style="margin-top:10px">
          <el-button @click="updateHonor">submit</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="删除帖子">
        <div class="title">删除帖子</div>
        <div style="width:100%;margin-top:250px">
          <el-input class="input" v-model="discussid" placeholder="discussid"></el-input>
        </div>
        <el-button @click="deleteDiscuss" style="margin-top:150px">submit</el-button>
      </el-tab-pane>

      <el-tab-pane label="删除比赛">
        <div class="title">删除比赛</div>
        <div style="width:100%;margin-top:250px">
          <el-input v-model="cid" class="input" placeholder="cid"></el-input>
        </div>
        <el-button @click="deleteContest" style="margin-top:150px">submit</el-button>
      </el-tab-pane>

      <el-tab-pane label="调整帖子">
        <div class="title">调整帖子</div>
        <div class="form">
          <div class="info">discussid:</div>
          <el-input class="input" v-model="discussid"></el-input>
        </div>
        <div class="form">
          <div class="info">priority:</div>
          <el-input class="input" v-model="priority"></el-input>
        </div>
        <div style="margin-top:5%">
          <el-button @click="changeDiscuss">submit</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import userPerType from '../../util/UserPermissionType.json'
export default {
  data () {
    return {
      // userPer: userPerType,
      ojvalue: '',
      oj: '',
      ojList: [{ id: 0, name: 'HDU' }, { id: 1, name: 'PKU' }],
      contestLevelValue: '',
      contestLevel: '',
      contestLevelList: [
        { id: 0, name: '其他' },
        { id: 1, name: 'ACM省赛' },
        { id: 2, name: 'ACM/ICPC区域赛' },
        { id: 3, name: 'EC-Final' },
        { id: 4, name: '世界总决赛' },
        { id: 5, name: '全国蓝桥杯大赛' },
        { id: 6, name: 'ACM全国邀请赛' },
        { id: 7, name: '全国大学生程序设计竞赛' }
      ],
      rewardValue: '',
      reward: '',
      rewardList: [
        { id: 0, name: '顽强拼搏奖' },
        { id: 1, name: '优秀奖/鼓励奖' },
        { id: 2, name: '铜奖' },
        { id: 3, name: '银奖' },
        { id: 4, name: '金奖' },
        { id: 5, name: '三等奖' },
        { id: 6, name: '二等奖' },
        { id: 7, name: '一等奖' },
        { id: 8, name: '其他' }
      ],
      title: '',
      pid: '',
      dateTime: '',
      username1: '',
      name1: '',
      username2: '',
      name2: '',
      username3: '',
      name3: '',
      remark: '',
      id: '',
      contestName: '',
      startTime: '',
      startTime2: '',
      endTime: '',
      endTime2: '',
      // contestTypeList:[
      //     {id:0,name:'公开'},
      //     {id:1,name:'密码'},
      //     {id:2,name:'私有'},
      //     {id:3,name:'注册'},
      //     {id:4,name:'正式'},
      //     {id:4,name:'组队'}
      // ],
      contestTypeValue: '',
      // kindList:[
      //     {id:0,name:'练习'}
      // ],
      kindValue: '',
      contestPassword: '',
      pidList: '',
      discussid: '',
      cid: '',
      priority: ''
    }
  },
  methods: {
    ojChange (val) {
      let obj = {}
      obj = this.ojList.find(item => {
        return item.id === val
      })
      this.oj = obj.name
      this.ojvalue = val
    },
    contestLevelChange (val) {
      let obj = {}
      obj = this.contestLevelList.find(item => {
        return item.id === val
      })
      this.contestLevel = obj.name
      this.contestLevelValue = val
    },
    contestTypeChange (val) {
      this.contestTypeValue = val
    },
    kindChange (val) {
      this.kindValue = val
    },
    rewardChange (val) {
      let obj = {}
      obj = this.rewardList.find(item => {
        return item.id === val
      })
      this.reward = obj.name
      this.rewardValue = val
    },
    async getProblemTitle () {
      if (this.pid !== null) {
        let params = new URLSearchParams()
        params.append('pid', this.pid)
        params.append('ojStr', this.oj)
        let { data } = await this.$http
          .post('/addProblem/GAddProblemTitle', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
            // return
          })
        this.title = data.data[0]
      }
    },
    async addProblem () {
      if (this.pid !== null) {
        // FIXME: add by axiang [20190701] 题目插入功能根本没法用，这里需要重构
        let params = new URLSearchParams()
        params.append('pid', this.pid)
        params.append('ojStr', this.oj)
        let dataAddProblem = await this.$http
          .post('/addProblem/IAddProblem', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
            // return
          })
        this.logger.i(dataAddProblem.data[0])
        this.$message({ message: '插入题目成功!', type: 'success' })
        // this.title = data.data[0]
      } else {
        this.$message({ message: '缺少重要信息!', type: 'error' })
      }
    },
    async addHonor () {
      if (
        (this.dateTime !== null &&
          this.contestLevelValue !== null &&
          this.rewardValue !== null) ||
        (this.name1 !== null && this.username1 !== null) ||
        (this.name2 !== null && this.username2 !== null) ||
        (this.username3 !== null && this.name3 !== null)
      ) {
        let params = new URLSearchParams()
        params.append('time', this.dateTime)
        params.append('username1', this.username1)
        params.append('username2', this.username2)
        params.append('username3', this.username3)
        params.append('name1', this.name1)
        params.append('name2', this.name2)
        params.append('name3', this.name3)
        params.append('contestLevel', this.contestLevel)
        params.append('awardsLevel', this.reward)
        params.append('text', this.remark)
        let dataIContestAward = await this.$http
          .post('/addContestAward/IContestAward', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
            // return
          })
        this.$message({ message: dataIContestAward.data[0], type: 'success' })
      } else {
        this.$message({ message: '缺少重要信息!', type: 'error' })
      }
    },
    async updateHonor () {
      if (
        (this.id !== null &&
          this.dateTime !== null &&
          this.contestLevelValue !== null &&
          this.rewardValue !== null) ||
        (this.name1 !== null && this.username1 !== null) ||
        (this.name2 !== null && this.username2 !== null) ||
        (this.username3 !== null && this.name3 !== null)
      ) {
        let params = new URLSearchParams()
        params.append('time', this.dateTime)
        params.append('username1', this.username1)
        params.append('username2', this.username2)
        params.append('username3', this.username3)
        params.append('name1', this.name1)
        params.append('name2', this.name2)
        params.append('name3', this.name3)
        params.append('contestLevel', this.contestLevel)
        params.append('awardsLevel', this.reward)
        params.append('text', this.remark)
        params.append('id', this.id)
        let dataUContestAward = await this.$http
          .post('/addContestAward/UContestAward', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
            // return
          })
        this.$message({ message: dataUContestAward.data[0], type: 'success' })
      } else {
        this.$message({ message: '缺少重要信息!', type: 'error' })
      }
    },
    async changeDiscuss () {
      if (this.discussid !== null && this.priority !== null) {
        let params = new URLSearchParams()
        params.append('id', this.discussid)
        params.append('priority', this.priority)
        let dataUPriority = await this.$http
          .post('/discuss/updatePriority', params)
          .catch(() => {
            this.$message({
              message: '服务器繁忙，请稍后再试！',
              type: 'error'
            })
            // return
          })
        this.$message.success(dataUPriority.msg)
      } else {
        this.$message.error('缺少重要信息!')
      }
    },
    async addContest () {
      if (
        this.startTime !== null &&
        this.endTime !== null &&
        this.contestName !== '' &&
        this.startTime2 !== null &&
        this.endTime2 !== null &&
        this.pidList !== ''
      ) {
        let params = new URLSearchParams()
        params.append('name', this.contestName)
        params.append('beginTime', this.startTime + ' ' + this.startTime2)
        params.append('endTime', this.endTime + ' ' + this.endTime2)
        params.append('problems', this.pidList)
        // params.append('rankType',1)
        // params.append('ctype',this.contestTypeValue)
        // params.append('password',this.contestPassword)
        // params.append('kind',this.kindValue)
        await this.$http.post('/IContest', params).catch(() => {
          this.$message({
            message: '服务器繁忙，请稍后再试！',
            type: 'error'
          })
          // return
        })
        // this.addProblems()
        this.$message({ message: '添加比赛成功!', type: 'success' })
      } else {
        this.$message({ message: '缺少重要信息!', type: 'error' })
      }
    },
    async deleteContest () {
      if (this.cid !== null) {
        let params = new URLSearchParams()
        params.append('cid', this.cid)
        await this.$http.post('/deleteContest', params).catch(() => {
          this.$message({
            message: '服务器繁忙，请稍后再试！',
            type: 'error'
          })
          // return
        })
        this.$message({ message: '删除比赛成功！', type: 'success' })
      }
    },
    async deleteDiscuss () {
      if (this.discussid !== null) {
        let params = new URLSearchParams()
        params.append('discussid', this.discussid)
        await this.$http.post('/discuss/deleteDiscuss', params).catch(() => {
          this.$message({
            message: '服务器繁忙，请稍后再试！',
            type: 'error'
          })
          // return
        })
        this.$message({ message: '删除帖子成功！', type: 'success' })
      }
    }
  }
}
</script>
<style scoped>
.docker {
  margin: 0;
  padding: 0;
  min-height: 700px;
}
.title {
  width: 100%;
  margin-bottom: 3%;
  font-size: 30px;
}
.tab {
  margin: 3% 20% 2% 20%;
  min-height: 700px;
}
.form {
  margin: 10px 10% 10px 10%;
  display: inline-flex;
  width: 80%;
  height: 50px;
}
.input {
  width: 30%;
  height: 50px;
}
.info {
  width: 35%;
  line-height: 50px;
  padding-right: 50px;
  text-align: right;
}
</style>
