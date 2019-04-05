<template>
    <div>
        <div>
            <h1>A + B Problem</h1>
            <h4>TimeLimit:1000MS  MemoryLimit:128MB</h4>
            <h4>64-bit integer IO format:%lld</h4>
        </div>
        <div class="card-div">
            <el-row>
                <el-col :span="8">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="float:left">题目统计信息</span>
                            <el-button style="float: right; padding: 3px 0" type="text">详细</el-button>
                        </div>
                        <div v-for="o in 5" :key="o" class="text item">
                            {{'content ' + o }}
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card">
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
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="float:left">出处</span>
                        </div>
                        <div class="text item">
                            第一届FZU Code Carnival 校内选拔 报名转用(请在队名前注明年级)
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="card-div">
            <div style="display:inline-flex;float:left">
                <h4>未提交 |</h4><h4><i class="el-icon-star"></i> 登录后收藏 |</h4><h4> 已有{{collect_people}}人收藏了本题</h4>
            </div>
            <el-card class="list-div">
                <div class="clearfix">
                    <span style="float:left;"><h4>Description</h4></span>
                </div>
                <div class="text item">
                    <span style="float:left">123{{title}}</span>
                </div>
                <div class="clearfix">
                    <span style="float:left;"><h4>Input</h4></span>
                </div>
                <div class="text item">
                    <span style="float:left">123{{title}}</span>
                </div>
                <div class="clearfix">
                    <span style="float:left"><h4>Output</h4></span>
                </div>
                <div class="text item">
                    <span style="float:left">123{{title}}</span>
                </div>
                <div class="clearfix">
                    <span style="float:left"><h4>SampleInput And SampleOutput</h4></span>    
                </div>
                <div class="text item">
                    <span style="float:left">123{{title}}</span>
                </div>
            </el-card>
        </div>
        <div class="submitDiv" v-if="islogin">
            <el-row>
                <el-col :span="2"><p>pid</p></el-col>
                <el-col :span="4"><el-input v-model="pid" :disabled="ture"></el-input></el-col>
                <el-col :span="2"><p>language</p></el-col>
                <el-col :span="4">
                    <el-select v-model="compileLanguage">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-input type="textarea" rows="8" placeholder="code" v-model="code"></el-input>
                </el-col>
            </el-row>
        </div>
        <div style="padding:0 0 2% 0;">
            <el-button round>Submit</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            options:[{
                value:'G++ 11',
                label:'G++ 11'
            },{
                value:'GCC 11',
                label:'GCC 11'
            },{
                value:'Pascal',
                label:'Pascal'
            },{
                value:'C#',
                label:'C#'
            },{
                value:'GO 1.8',
                label:'GO 1.8'
            },{
                value:'JAVA',
                label:'JAVA'
            },{
                value:'Python3',
                label:'Python3'
            },{
                value:'JavaScript',
                label:'JavaScript'
            }],

            code:'',

            islogin:flase
        }
    }
}
</script>

<style scoped>
.card-div{
    width: 80%;
    margin:3% 10% 0 10%;
    padding:0 0 3% 0;
}

.list-div{
    width: 100%;
}

.box-card {
    width: 400px;
    height: 250px;
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
    clear: both
}

.submitDiv{
    width: 80%;
    margin:0 10% 0 10%;
    padding:0 0 5% 0;
}

.el-row {
    margin-bottom: 20px;
}
</style>
