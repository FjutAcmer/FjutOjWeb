<template>
  <div class="body">
    <div class="add-contest-box">
      <h3>修改比赛信息</h3>
      <div class="left-box">
        <el-form
          ref="formContest"
          :model="formContest"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item
            label="比赛ID："
            prop="contestId"
          >
            <el-input
              ref="contestId"
              placeholder="请输入待修改的比赛ID"
              v-model="formContest.contestId"
              size="medium"
              style="width:300px;"
              @keydown.enter.native="searchContest"
              @blur="searchContest"
            ></el-input>
            <span :class="this.warningClass">{{this.contestNotFoundText}}</span>
          </el-form-item>
          <el-form-item
            label="比赛类型："
            prop="contestKind"
          >
            <el-select v-model="formContest.contestKind">
              <el-option
                ref="contestKind"
                v-for="item in kindType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="比赛标题："
            prop="contestTitle"
          >
            <el-input
              ref="contestTitle"
              placeholder="请输入比赛标题"
              v-model="formContest.contestTitle"
              size="medium"
              style="width:400px;"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="比赛权限："
            prop="contestType"
          >
            <el-select v-model="formContest.contestType">
              <el-option
                ref="contestType"
                v-for="item in CType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div v-if="formContest.contestType === '1'">
            <el-form-item label="输入密码：">
              <el-input show-password></el-input>
            </el-form-item>
          </div>

          <el-form-item
            v-if="formContest.contestType === '3'"
            label="注册时间："
          >
            <el-date-picker
              v-model="formContest.regStartEndTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册结束日期"
              align="right"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label="起止时间："
            prop="contestStartEndTime"
          >
            <el-date-picker
              ref="contestStartEndTime"
              v-model="formContest.contestStartEndTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="选择赛题："
            prop="pidList"
          >
            <el-input
              ref="pidList"
              placeholder="请输入题目ID，不同题目之间用单个空格隔开"
              v-model="formContest.pidList"
              style="width:400px;"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="this.btnDisabled"
              @click="onSubmit('formContest')"
            >修改比赛</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-box">
        比赛介绍：
        <RichTextEditor
          @input="getText"
          :text="this.formContest.info"
        ></RichTextEditor>
      </div>
    </div>

  </div>
</template>

<script>
import RichTextEditor from '../../common/RichTextEditor'
import FormatterDate from '../../../util/formatterDate.js'
export default {
  components: {
    RichTextEditor
  },
  data () {
    return {
      contestNotFoundText: '点击回车确认',
      warningClass: 'warning-label',
      btnDisabled: '',
      kindType: [
        {
          value: '0',
          label: '练习'
        }, {
          value: '1',
          label: '积分'
        }, {
          value: '2',
          label: '趣味'
        }, {
          value: '3',
          label: '正式'
        }, {
          value: '5',
          label: 'DIY'
        }],
      CType: [
        {
          value: '0',
          label: '公开'
        }, {
          value: '1',
          label: '密码'
        }, {
          value: '2',
          label: '私有'
        }, {
          value: '3',
          label: '注册'
        }, {
          value: '4',
          label: '正式'
        }, {
          value: '5',
          label: '组队'
        }
      ],
      formContest: {
        contestId: '',
        contestType: '',
        contestKind: '',
        contestTitle: '',
        contestStartEndTime: [],
        regStartEndTime: [],
        info: '',
        pidList: ''
      },
      rules: {
        contestId: [
          // { required: true, message: '请输入比赛ID', trigger: 'change' }
        ],
        contestKind: [
          { required: true, message: '请选择比赛类型', trigger: 'change' }
        ],
        contestTitle: [
          { required: true, message: '请输入比赛标题', trigger: 'change' }
        ],
        contestType: [
          { required: true, message: '请选择比赛权限', trigger: 'change' }
        ],
        contestStartEndTime: [
          { required: true, message: '请选择起始终止时间', trigger: 'change' }
        ],
        pidList: [
          // TODO: 匹配四个数字一组，中间使用空格的字符串验证方法
          {}
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateContest()
          this.logger.i('onsubmit正常')
        } else {
          this.logger.e('onsubmit错误')
          return false
        }
      })
      this.logger.me('onSubmit', '点击注册！')
    },
    async searchContest () {
      if (this.formContest.contestId === '') { return }
      if (!(/^[0-9]*$/).test(this.formContest.contestId)) {
        this.contestNotFoundText = '比赛ID为纯数字哦'
        this.warningClass = 'error-label'
        return
      }
      this.btnDisabled = true
      let params = new URLSearchParams()
      params.append('cid', this.formContest.contestId)
      let dataSearchContest = await this.$http
        .get('/contest/getContestByCid', params)
      console.log(dataSearchContest)
      if (dataSearchContest.code === 100) {
        this.contestNotFoundText = dataSearchContest.msg
        this.warningClass = 'success-label'
        let temp = dataSearchContest.datas[0]
        this.formContest.contestTitle = temp.name
        this.formContest.contestType = String(temp.ctype)
        this.formContest.contestKind = String(temp.kind)
        this.formContest.contestStartEndTime = [new Date(temp.beginTime), new Date(temp.endTime)]
        this.formContest.info = temp.info
        this.formContest.pidList = dataSearchContest.datas[1]
        /* FIXME: 还没做完，这里是搜索比赛信息后将信息填充进框里，
            问题是饿了么UI的日期选择器不允许直接绑定
            */
      } else {
        this.contestNotFoundText = dataSearchContest.msg
        this.warningClass = 'error-label'
        this.formContest.contestType = ''
        this.formContest.contestKind = ''
        this.formContest.contestTitle = ''
        this.formContest.contestStartEndTime = []
        this.formContest.regStartEndTime = []
        this.formContest.info = ''
        this.formContest.pidList = ''
      }
      this.btnDisabled = false
    },
    async updateContest () {
      let cid = this.formContest.contestId
      let kind = this.formContest.contestKind
      let name = this.formContest.contestTitle
      let ctype = this.formContest.contestType
      let beginTime = FormatterDate(this.formContest.contestStartEndTime[0])
      let endTime = FormatterDate(this.formContest.contestStartEndTime[1])
      let registerBeginTime = FormatterDate(this.formContest.regStartEndTime[0])
      let registerEndTime = FormatterDate(this.formContest.regStartEndTime[1])
      let pidList = this.formContest.pidList
      let info = this.formContest.info
      let params = new URLSearchParams()
      params.append('username', this.$store.getters.getUsername)
      params.append('cid', cid)
      params.append('name', name)
      params.append('beginTime', beginTime)
      params.append('endTime', endTime)
      params.append('ctype', ctype)
      params.append('registerBeginTime', registerBeginTime)
      params.append('registerEndTime', registerEndTime)
      params.append('info', info)
      params.append('kind', kind)
      params.append('pidList', pidList)
      let dataSubmit = await this.$http
        .post('/contest/updateContest', params)
      if (dataSubmit.code === 100) {
        this.$alert('比赛信息修改成功！', '成功', {
          confirmButtonText: '确定',
          type: 'success',
          center: true
        })
      } else {
        this.$message.error(dataSubmit.msg)
      }
    },
    getText (val) {
      this.formContest.info = val
    },
    findTypeLabelByValue (val) {
      for (let item in this.CType) {
        if (item.value === val) {
          return item.label
        }
      }
      return ''
    },
    findKindLabelByValue (val) {
      for (let item in this.kindType) {
        if (item.value === val) {
          return item.label
        }
      }
      return ''
    }
  }
}

</script>

<style scoped>
.body {
  width: 100%;
  min-height: 400px;
}

.add-contest-box {
  width: 100%;
  min-height: 460px;
}

.left-box {
  float: left;
  width: 45%;
}

.right-box {
  float: left;
  width: 55%;
}

.warning-label {
  color: #409EFF;
}

.error-label{
  color:red;
}

.success-label {
  color: green;
}
</style>
