<template>
  <div id="blockView" ></div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      myChart: '',
      dataBlocks: '',
      myTextStyle: {
        fontSize: '17',
        color: 'white'
        // fontWeight: 'bold'
      },
      myItemStyle: {
        Solved: {
          normal: {
            borderColor: 'rgb(116, 207, 18)',
            borderWidth: 4,
            shadowBlur: 40,
            shadowColor: '#eeeeee',
            color: 'rgb(116, 207, 18)'
          }
        },
        Solving: {
          normal: {
            borderColor: 'rgb(206, 188, 11)',
            borderWidth: 4,
            shadowBlur: 40,
            shadowColor: '#eeeeee',
            color: 'rgb(206, 188, 11)'
          }
        },
        Locked: {
          normal: {
            borderColor: 'rgb(213,43,43)',
            borderWidth: 4,
            shadowBlur: 40,
            shadowColor: '#eeeeee',
            color: 'rgb(213,43,43)'
          }
        }
      }
    }
  },
  mounted () {
    this.init()
    this.getBlocks()
  },
  destroyed () {
    this.myChart.dispose()
  },
  methods: {
    init () {
      this.myChart = echarts.init(document.getElementById('blockView'))
      this.myChart.showLoading()
    },
    // TODO:获取解锁的前置条件内容
    getPerCondition () {
      return '在入门中得到 10分'
    },
    async getBlocks () {
      let params = new URLSearchParams()
      let username = this.$store.getters.getUsername
      if (username === '') {
        this.$message({message: '登录后重试！', type: 'error'})
        return
      }
      this.logger.p({'username': username})
      params.append('username', username)
      let dataGetBlocks = await this.$http
        .post('/challenge/getAllChallengeBlocks', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      if (dataGetBlocks.code === 100) {
        // TODO:
        // this.$message({message: '获取挑战模块成功!', type: 'success'})
      } else {
        this.$message({message: '未找到挑战模块！', type: 'error'})
        return
      }
      this.dataBlocks = dataGetBlocks.datas[0]
      // console.log(dataGetBlocks)
      this.loadEchartsSeries()
    },
    loadEchartsSeries () {
      let datas = []
      // for (let i = 0; i < 20; i++) {
      for (let i = 0; i < this.dataBlocks.length; i++) {
        let dataTemp = {
          // TODO:力动态模式在显示模块多的时候略卡，有需要的到时候做一个坐标系布局的
          // x: 100,
          // y: 100,
          // value: 10,
          id: this.dataBlocks[i].id,
          name: this.dataBlocks[i].name,
          // 根据模块的分数动态调整圆圈大小
          symbolSize: Math.ceil(Math.sqrt(this.dataBlocks[i].totalScore + 10)) * 22,
          getScored: this.dataBlocks[i].getScore,
          notScored: this.dataBlocks[i].totalScore - this.dataBlocks[i].getScore,
          locked: this.dataBlocks[i].locked,
          // draggable: true,
          itemStyle: this.dataBlocks[i].locked ? this.myItemStyle.Locked : this.dataBlocks[i].totalScore === this.dataBlocks[i].getScore
            ? this.myItemStyle.Solved : this.myItemStyle.Solving,
          label: {
            normal: {
              formatter: this.dataBlocks[i].name,
              position: 'inside',
              show: true,
              textStyle: this.myTextStyle
            }
          }
        }
        datas.push(dataTemp)
      }
      this.showEchartsView(datas)
    },
    showEchartsView (datas) {
      let _this = this
      let option = {
        title: {
          text: '挑战关系图',
          top: 50,
          left: 50
        },
        legendHoverLink: true,
        // hoverAnimation: true,
        cursor: 'pointer',
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let blockName = params.data.name
            let getScored = params.data.getScored
            // let notScored = params.data.notScored
            let totalScore = params.data.getScored + params.data.notScored
            let lockedStr = ''
            let percent = (getScored / totalScore * 100).toFixed(2) + '%'
            if (params.data.locked === false) {
              lockedStr = '已获得分数：'
              return `模块【${blockName}】<br/>【${lockedStr} ${getScored}/${totalScore} 】，【占比：${percent}】`
            } else {
              lockedStr = '未解锁'
              return `模块【${blockName}】<br/>【${lockedStr}】`
            }
          }
        },
        nodeScaleRatio: 0,
        // animationDelay: 500,
        // animationDelayUpdate: 10000,
        // animation: false,
        animationDurationUpdate: 20000,
        animationEasingUpdate: 'bounceIn',
        focusNodeAdjacency: true,
        color: ['#fff', '#fff', '#fff'],
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            initLayout: 'circular',
            repulsion: 500,
            edgeLength: 220,
            edgeSymbol: ['circle', 'arrow']
          },
          lineStyle: {
            width: 6,
            type: 'solid',
            curveness: 0
          },
          roam: true,
          label: {
            normal: {
              show: true
            }
          },
          // TODO:获取相连节点
          links: [
            // {
            //   source: '1',
            //   target: '7'
            // }, {
            //   source: '9',
            //   target: '7'
            // }, {
            //   source: '8',
            //   target: '7'
            // }, {
            //   source: '3',
            //   target: '7'
            // }
          ],
          data: datas
        }]}

      this.myChart.setOption(option)
      this.myChart.on('click', function (params) {
        if (params.componentType === 'series') {
          // console.log(params)
          let blockId = params.data.id
          // TODO:获取解锁的前置条件内容
          let condition = _this.getPerCondition(blockId)
          if (params.data.locked === true) {
            _this.$alert(
              `${condition}`,
              `模块【${params.data.name}】的解锁条件`,
              {
                confirmButtonText: '确定'
              }
            )
          } else {
            _this.logger.i(
              '\n选择的模块ID为：' +
                params.data.id +
                '\n模块名为：' +
                params.data.name
            )
            _this.$router.push({
              path: '/CallengeBlock',
              query: { id: params.data.id }
            })
          }
          // console.log(params)
        }
      })
      this.myChart.hideLoading()
    }
  }
}
</script>

<style scoped>

#blockView{
  align-items: center;
  border: 0px;
  width: 100%;
  height: 800px;
  background-color: #eeeeee

}
</style>
