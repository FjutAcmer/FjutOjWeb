<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="float:left">ACB富豪榜 Top10</span>
                <el-button style="float: right; padding: 3px 0" type="text">All</el-button>
            </div>
            <div v-for="o in 11" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
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
    clear: both
  }

  .box-card {
    width: 400px;
  }
</style>

