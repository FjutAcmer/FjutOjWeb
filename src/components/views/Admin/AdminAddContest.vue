<template>
  <div class="body">
    <div class="left-box">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="比赛类型：">
          <el-select v-model="form.contestKind">
            <el-option
              v-for="item in kindType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛标题：">
          <el-input
            placeholder="请输入比赛标题"
            v-model="form.contestTitle"
            size="medium"
            style="width:400px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="比赛权限：">
          <el-select v-model="form.contestType">
            <el-option
              v-for="item in CType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <div v-if="form.contestType === '1'">
          <el-form-item label="输入密码：">
            <el-input show-password></el-input>
          </el-form-item>
        </div>
        <el-form-item label="起止时间：">
          <el-date-picker
            v-model="form.contestStartEndTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="注册时间：">
          <el-date-picker
            v-model="form.regStartEndTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="注册开始日期"
            end-placeholder="注册结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="选择赛题：">
          <!-- <el-button type="info">点我添加</el-button> -->
          <el-input
            placeholder="请输入题目ID，不同题目之间用空格"
            v-model="form.pidList"
            style="width:400px;"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right-box">
      比赛介绍：
      <RichTextEditor @input="getText"></RichTextEditor>
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
      form: {
        contestType: '',
        contestKind: '',
        contestTitle: '',
        contestStartEndTime: [],
        regStartEndTime: [],
        info: '',
        pidList: ''
      }
    }
  },
  mounted () {

  },
  methods: {
    async onSubmit () {
      let kind = this.form.contestKind
      let name = this.form.contestTitle
      let ctype = this.form.contestType
      let beginTime = FormatterDate(this.form.contestStartEndTime[0])
      let endTime = FormatterDate(this.form.contestStartEndTime[1])
      let registerBeginTime = FormatterDate(this.form.regStartEndTime[0])
      let registerEndTime = FormatterDate(this.form.regStartEndTime[1])
      let pidList = this.form.pidList
      let info = this.form.info
      let params = new URLSearchParams()
      params.append('username', this.$store.getters.getUsername)
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
        .post('/contest/insertContest', params)
        .catch(() => {
          // this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      if (dataSubmit.code === 100) {
        this.$message.success('比赛添加成功！')
      } else {
        this.$message.error(dataSubmit.msg)
      }
    },
    test () {
      console.log(this.form)
    },
    getText (val) {
      this.form.info = val
    }
  }
}
</script>

<style scoped>
.body {
  width: 100%;
  min-height: 500px;
}

.left-box {
  float: left;
  width: 45%;
}

.right-box {
  float: right;

  width: 55%;
}
</style>
