<template>
  <div>
    <el-card id="topborder">
      <div slot="header">
        <span class="title-text">积分榜 Top10</span>
        <el-link
          type="info"
          class="elcard-showmore-link"
        >查看全部</el-link>
      </div>
      <el-table
        :data="ratingTop"
        :cell-style="{padding:5+'px'}"
      >
        <el-table-column
          type="index"
          label="#"
          width="50"
        ></el-table-column>
        <el-table-column
          label="用户名"
          width="150"
        >
          <template slot-scope="scope">
            <span
              :class="selectColor(scope)"
              @click="toUser(scope.row.username)"
            >{{scope.row.nick}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Rating">
          <template slot-scope="scope">
            <span
              :class="selectColor(scope)"
              @click="toUser(scope.row.username)"
            >{{scope.row.rating}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card id="topborder">
      <div slot="header">
        <span class="title-text">AC题数榜 Top10</span>
        <el-link
          type="info"
          class="elcard-showmore-link"
        >查看全部</el-link>
      </div>
      <el-table
        :data="acTop"
        :cell-style="{padding:5+'px'}"
      >
        <el-table-column
          type="index"
          label="#"
          width="50"
        ></el-table-column>
        <el-table-column
          label="用户名"
          width="150"
        >
          <template slot-scope="scope">
            <div
              :class="selectColor(scope)"
              @click="toUser(scope.row.username)"
            >{{scope.row.nick}}</div>
          </template></el-table-column>
        <el-table-column label="AC题数">
          <template slot-scope="scope">
            <div
              :class="selectColor(scope)"
              @click="toUser(scope.row.username)"
            >{{scope.row.acnum}}</div>
          </template></el-table-column>
      </el-table>
    </el-card>
    <el-card id="topborder">
      <div slot="header">
        <span class="title-text">AC币富豪榜 Top10</span>
        <el-link
          type="info"
          class="elcard-showmore-link"
        >查看全部</el-link>
      </div>
      <el-table
        :data="acbTop"
        :cell-style="{padding:5+'px'}"
      >
        <el-table-column
          type="index"
          label="#"
          width="50"
        ></el-table-column>
        <el-table-column
          label="用户名"
          width="150"
        >
          <template slot-scope="scope">
            <div
              :class="selectColor(scope)"
              @click="toUser(scope.row.username)"
            >{{scope.row.nick}}</div>
          </template></el-table-column>
        <el-table-column label="AC币">
          <template slot-scope="scope">
            <div
              :class="selectColor(scope)"
              @click="toUser(scope.row.username)"
            >{{scope.row.acb}}</div>
          </template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      acTop: [],
      acbTop: [],
      ratingTop: [],
      activeTop: []
    }
  },
  mounted () {
    this.getAllTop()
  },
  methods: {
    selectColor (scoped) {
      if (scoped.$index === 0) {
        return 'border-level-five'
      } else if (scoped.$index >= 1 && scoped.$index < 6) {
        return 'border-level-four'
      } else {
        return 'border-level-three'
      }
    },
    async getAllTop () {
      let dataRank = await this.$http.get('/getAllTopBorder').catch(() => {
        this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
      })
      this.acbTop = dataRank.datas[0]
      this.ratingTop = dataRank.datas[1]
      this.acTop = dataRank.datas[2]
      this.activeTop = dataRank.datas[3]
    },
    toUser (username) {
      this.$router.push({
        path: '/User',
        query: { username: username }
      })
    }

  }
}
</script>

<style scoped >
.el-card {
  margin-bottom: 20px;
  font-weight: bolder;
}

.title-text {
  color: red;
  text-shadow: 0px 0px 5px gold;
}

.showmore-link {
  float: right;
  font-size: 14px;
}

.border-level-one {
  color: darkcyan;
}

.border-level-one:hover {
  cursor: pointer;
}

.border-level-two {
  color: blue;
}

.border-level-two:hover {
  cursor: pointer;
}

.border-level-three {
  color: #ff0080;
}

.border-level-three:hover {
  cursor: pointer;
}

.border-level-four {
  color: #ff0000;
}

.border-level-four:hover {
  cursor: pointer;
}

.border-level-five {
  color: #ff8000;
}
.border-level-five:hover {
  cursor: pointer;
}
</style>
