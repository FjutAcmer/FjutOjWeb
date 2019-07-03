<template>
  <div class="verify-body">
    <el-card class="box-card" :body-style="{ padding: '0px' }">
      <div slot="header">
        <span>实名认证</span>
        <!-- <el-button  type="text">操作按钮</el-button> -->
      </div>
      <div class="card-body">
        <!-- TODO: add by axiang [20190703] 还未设计后端，而且没有设计验证规则 -->
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="认证类型">
            <el-select v-model="formData.verifyType" placeholder="请选择认证类型">
              <!-- <el-option label="请选择认证类型" value="0"></el-option> -->
              <el-option label="申请修改资料" value="0"></el-option>
              <el-option label="认证为ACM集训队员" value="1"></el-option>
              <el-option label="申请ACM退役" value="2"></el-option>
              <el-option label="认证为中世竞创协会成员" value="3"></el-option>
              <el-option label="认证为FJUT在校学生" value="4"></el-option>
              <el-option label="认证为其他学校学生" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="formData.gender" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- TODO: 可以做快捷输入，从数据库得到全部学校全称 -->
          <el-form-item label="学校全称">
            <el-input v-model="formData.school"></el-input>
          </el-form-item>
          <el-form-item label="学院全称">
            <el-input v-model="formData.faculty"></el-input>
          </el-form-item>
          <el-form-item label="专业全称">
            <el-input v-model="formData.major"></el-input>
          </el-form-item>
          <!--  -->
          <el-form-item label="班级编号">
            <el-input v-model="formData.cla"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="formData.no"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="formData.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="毕业年份">
            <el-input v-model="formData.graduationTime"></el-input>
          </el-form-item>
          <!-- TODO: add by axiang [20190702] 文件上传可用，功能还未设计完整 -->
          <!-- :data设置附带参数，这里传入formData内的内容 -->
          <el-form-item label="认证材料">
            <el-upload
              ref = "uploadPic"
              class="file-upload"
              name="file"
              :data="formData"
              action="http://localhost:8080/file/uploadPic"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :before-remove="beforeRemove"
              :limit="1"
              :on-exceed="handleExceed"
              :auto-upload="false"
              accept="image/jpeg, image/png"
            >
              <el-button size="mini" type="primary">选择照片</el-button>
              <div slot="tip">请上传餐卡或者学生证照片（仅支持JPG,PNG格式）</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">申请认证</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        verifyType: '',
        username: this.$store.getters.getUsername,
        name: '',
        school: '',
        gender: '',
        faculty: '',
        major: '',
        cla: '',
        no: '',
        phone: '',
        email: '',
        graduationTime: ''
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning('只允许上传一个文件！')
    },
    beforeUpload (file) {
      const isJPG = (file.type === 'image/jpeg') | (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能是JPG或者PNG格式！')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小限制在2M以内！')
      }
      return isJPG && isLt2M
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}这个文件吗？`)
    },
    onSubmit () {
      this.$refs.uploadPic.submit()
    }
  }
}
</script>

<style scoped>
.verify-body {
  width: 100%;
  height: auto;
  margin-bottom: 50px;
  padding: 0;
}

.box-card {
  width: 550px;
  height: auto;
  display: block;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  border: 0;
  padding: 0;
}

.card-body {
  margin: 30px 30px 30px 30px;
}

.file-upload {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
</style>
