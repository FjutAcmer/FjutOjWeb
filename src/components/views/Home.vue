<template>
  <div>
    <div class="carousel">
      <Carousel></Carousel>
    </div>
    <div class="card">
      <RCompetition></RCompetition>
    </div>
    <div class="card">
      <div style="width:30%;margin-right:5%">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="float:left">Rating Top10</span>
            <el-button style="float: right; padding: 3px 0" type="text">All</el-button>
          </div>
          <div slot="header" style="margin:8px 0 15px 0;">
            <div style="width:20%;float:left">#</div>
            <div style="width:50%;float:left">User</div>
            <div style="width:30%;float:left">Rating</div>
          </div>
          <div v-for="(o,index) in ratingTop?ratingTop:10" :key="index" class="text item">
            <div style="width:100%;display:inline-flex;">
              <div style="width:20%;float:left">{{index+1}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=0&&o.acnum<=100"
                style="cursor:pointer;width:50%;float:left;color:gray"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=100&&o.acnum<=500"
                style="cursor:pointer;width:50%;float:left;color:blue"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=500&&o.acnum<=700"
                style="cursor:pointer;width:50%;float:left;color:purple"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=700&&o.acnum<=1000"
                style="cursor:pointer;width:50%;float:left;color:#FF6A6A"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=1000"
                style="cursor:pointer;width:50%;float:left;color:orange"
              >{{o.nick?o.nick:"无"}}</div>
              <div style="width:30%;float:left">{{o.rating?o.rating:""}}</div>
            </div>
          </div>
        </el-card>
      </div>
      <div style="width:30%">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="float:left">AC榜 Top10</span>
            <el-button style="float: right; padding: 3px 0" type="text">All</el-button>
          </div>
          <div slot="header" style="margin:8px 0 15px 0;">
            <div style="width:20%;float:left">#</div>
            <div style="width:50%;float:left">User</div>
            <div style="width:30%;float:left">AC</div>
          </div>
          <div v-for="(o,index) in acTop?acTop:10" :key="index" class="text item">
            <div style="width:100%;display:inline-flex;">
              <div style="width:20%;">{{index+1}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=0&&o.acnum<=100"
                style="cursor:pointer;width:50%;float:left;color:gray"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=100&&o.acnum<=500"
                style="cursor:pointer;width:50%;float:left;color:blue"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=500&&o.acnum<=700"
                style="cursor:pointer;width:50%;float:left;color:purple"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=700&&o.acnum<=1000"
                style="cursor:pointer;width:50%;float:left;color:#FF6A6A"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=1000"
                style="cursor:pointer;width:50%;float:left;color:orange"
              >{{o.nick?o.nick:"无"}}</div>
              <div style="width:30%;float:left">{{o.acnum?o.acnum:""}}</div>
            </div>
          </div>
        </el-card>
      </div>
      <div style="width:30%;margin-left:5%">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="float:left">ACB富豪榜 Top10</span>
            <el-button style="float: right; padding: 3px 0" type="text">All</el-button>
          </div>
          <div slot="header" style="margin:8px 0 15px 0;">
            <div style="width:20%;float:left">#</div>
            <div style="width:50%;float:left">User</div>
            <div style="width:30%;float:left">ACB</div>
          </div>
          <div v-for="(o,index) in acbTop?acbTop:10" :key="index" class="text item">
            <div style="width:100%;display:inline-flex;">
              <div style="width:20%;float:left">{{index+1}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=0&&o.acnum<=100"
                style="cursor:pointer;width:50%;float:left;color:gray"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=100&&o.acnum<=500"
                style="cursor:pointer;width:50%;float:left;color:blue"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=500&&o.acnum<=700"
                style="cursor:pointer;width:50%;float:left;color:purple"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=700&&o.acnum<=1000"
                style="cursor:pointer;width:50%;float:left;color:#FF6A6A"
              >{{o.nick?o.nick:"无"}}</div>
              <div
                @click="toUser(o.username)"
                v-if="o.acnum>=1000"
                style="cursor:pointer;width:50%;float:left;color:orange"
              >{{o.nick?o.nick:"无"}}</div>
              <div style="cursor:pointer;width:30%;float:left">{{o.acb?o.acb:""}}</div>
            </div>
          </div>
        </el-card>
        <!-- <el-card class="box-card">
              <div slot="header" class="clearfix">
                  <span style="float:left">最近活跃 Top10</span>
                  <el-button style="float: right; padding: 3px 0" type="text">All</el-button>
              </div>
              <div slot="header" style="margin:8px 0 15px 0;">
                <div style="width:20%;float:left">#</div>
                <div style="width:80%;float:left">User</div>
              </div>
              <div v-for="(o,index) in activeTop!=''?activeTop:10" :key="o" class="text item">
              <div style="width:100%;display:inline-flex;">
                <div style="width:20%;float:left">{{index+1}}</div>
                <div style="width:80%;float:left">{{o.nick?o.nick:"无"}}</div>
              </div>
              </div>
        </el-card>-->
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/common/CarouselGraph";
import RCompetition from "@/components/common/RecentCompetition";

export default {
  components: {
    Carousel,
    RCompetition
  },
  data() {
    return {
      ratingTop: "",
      acTop: "",
      acbTop: "",
      activeTop: ""
    };
  },
  methods: {
    async getAllTop() {
      let dataRank = await this.$http.post("/Galltop").catch(() => {
        this.$message({ message: "服务器繁忙，请稍后再试！", type: "error" });
      });
      this.acbTop = dataRank.data[0];
      this.ratingTop = dataRank.data[1];
      this.acTop = dataRank.data[2];
      this.activeTop = dataRank.data[3];
    },
    toUser(username) {
      this.$router.push({ path: "/User", query: { username: username } });
    }
  },
  mounted() {
    this.getAllTop();
  }
};
</script>

<style>
.carousel {
  padding: 0;
  margin: 30px 18% 30px 18%;
}

.card {
  padding: 0;
  margin: 30px 18% 30px 18%;
  width: 64%;
  display: inline-flex;
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

.box-card {
  width: 100%;
  max-height: 95%;
}
</style>
