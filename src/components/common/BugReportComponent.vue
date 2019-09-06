<template>
  <div class="bugreport-body">
    <el-dialog
      title="BUG反馈"
      width="40%"
      :visible.sync="visiable"
      @closed="closeDialog"
    >
      <el-form
        :model="form"
        :label-width="formLabelWidth"
        :rules="rules"
        ref="form"
      >
        <!-- <el-form-item label="反馈用户：">
          <el-input
            v-model="form.username"
            disabled
          ></el-input>
        </el-form-item> -->
        <el-form-item
          label="BUG类型："
          prop="type"
        >
          <el-select
            v-model="form.type"
            placeholder="请选择BUG类型"
          >
            <el-option
              v-for="item in bugType"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="标题："
          prop="title"
        >
          <el-input
            v-model="form.title"
            placeholder="给你遇到的BUG起个标题吧（在哪个界面遇到了哪些问题）"
          ></el-input>
        </el-form-item>
        <el-form-item label="BUG描述：">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请详细描述BUG信息，以便开发者更好定位问题！"
            v-model="form.text"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="onSubmit('form')"
        >提交BUG反馈</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean
  },
  watch: {
    dialogVisible (val) {
      this.visiable = val
    }
  },
  data () {
    return {
      visiable: false,
      bugType: [
        {
          label: '其他',
          value: '0'
        },
        {
          label: '系统漏洞',
          value: '1'
        },
        {
          label: '功能异常',
          value: '2'
        },
        {
          label: '逻辑错误',
          value: '3'
        },
        {
          label: '界面问题',
          value: '4'
        }
      ],
      rules: {
        type: [
          { required: true, message: '请选择BUG类型', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      // dialogVisible: true,
      formLabelWidth: '100px',
      form: {
        title: '',
        type: '',
        text: ''
      }
    }
  },
  methods: {
    closeDialog () {
      this.visiable = false
      this.$emit('visiable', false)
    },
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.logger.i('onsubmit正常')
          this.insertBugReport()
          this.closeDialog(0)
        } else {
          this.logger.e('onsubmit错误')
        }
      })
    },
    async insertBugReport () {
      let params = new URLSearchParams()
      params.append('username', this.$store.getters.getUsername)
      params.append('type', this.form.type)
      params.append('title', this.form.title)
      params.append('text', this.form.text)
      let dataRet = await this.$http.post('/bug/bugReport', params)
      if (dataRet.code === 100) {
        this.$message.success('BUG反馈成功！')
      } else {
        this.$message.error('BUG反馈提交失败！')
      }
    }
  }
}
</script>

<style scoped>
</style>
