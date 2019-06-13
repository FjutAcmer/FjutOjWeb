<template>
  <div class="recent-competition">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="float:left">常用文件下载中心</span>
      </div>
      <div style="width:100%;">
        <div style="font-size:30px;width:100%;text-align:left;margin-bottom:20px">1.浏览器</div>
        <div style="width:100%;text-align:left;margin-bottom:20px;margin-left:10px">
          <a
            href="https://www.baidu.com/link?url=TYRLpR33-zOr1fu90h5l6NNVpJyTPmIku3thm_b5KA_HtdV7NRqYJ6XOsW9pDtkQn_lUrlbKxM7rBTs1R28GxTLjiI1stT3xzfOywBnmBAOsPXGw4L4tCDYAGT64-ERBzApP_XkYmpuURitOV928COujSyRDrGiX1oobZRzYeGO&wd=&eqid=9628b0060005a743000000065cf0d017"
            style="line-height: 16px; white-space: normal;"
            target="_blank"
            title="谷歌浏览器"
          >谷歌浏览器</a>
        </div>

        <div style="font-size:30px;width:100%;text-align:left;margin-bottom:20px">2.codeblocks</div>
        <div style="width:100%;text-align:left;margin-bottom:20px;margin-left:10px">
          <a
            href="http://www.codeblocks.org/downloads/26"
            style="line-height: 16px; white-space: normal;"
            target="_blank"
          >官网下载</a>
        </div>
        <img
          src="http://120.78.128.11/pic/upload/20171001/1506836996630049635.png"
          style="width:100%"
          alt="image.png"
        >
        <div style="font-size:30px;width:100%;text-align:left;margin-bottom:20px">3.其他</div>
        <div style="width:100%;text-align:left;margin-bottom:50px;margin-left:10px">
          <a
            href="http://120.78.128.11/file/jihehuaban.zip"
            style="line-height: 16px; white-space: normal;"
            target="_blank"
          >几何画板</a>
          <a
            href="http://120.78.128.11/file/upload/20160818/1471501247639019014.zip"
            style="line-height: 16px; white-space: normal;"
            target="_blank"
          >卡西欧计算器</a>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: []
    };
  }
};
</script>

<style scoped>
.recent-competition {
  padding: 0;
  width: 100%;
  margin: 0;
}

/* .clearfix {
  float: left;
} */

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 98%;
  height: 100%;
}
</style>
