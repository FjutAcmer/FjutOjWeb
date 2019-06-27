<template>
  <div id="blockView"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      myChart: '',
      dataBlocks: '',
      conditions: '',
      myTextStyle: {
        fontSize: '15',
        color: 'white',
        fontWeight: 'bold'
      },
      myCategories: [
        {
          name: '全部完成',
          symbol: 'circle',
          itemStyle: {
            borderColor: 'rgb(116, 207, 18)',
            borderWidth: 4,
            shadowBlur: 40,
            shadowColor: '#eeeeee',
            color: 'rgb(116, 207, 18)'
          }
        },
        {
          name: '部分完成',
          symbol: 'rect',
          itemStyle: {
            borderColor: '#FFC125',
            borderWidth: 4,
            shadowBlur: 40,
            shadowColor: '#eeeeee',
            color: '#FFC125'
          }
        },
        {
          name: '未解锁',
          symbol: 'diamond',
          itemStyle: {
            borderColor: 'rgb(213,43,43)',
            borderWidth: 4,
            shadowBlur: 40,
            shadowColor: '#eeeeee',
            color: 'rgb(213,43,43)'
          }
        }
      ]
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
    async getPerCondition (blockId) {
      let res = ''
      let params = new URLSearchParams()
      params.append('blockId', blockId)
      let dataBlockCondition = await this.$http
        .post('/challenge/getConditionByBlockId', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      if (dataBlockCondition.code === 100) {
        let dataTemp = dataBlockCondition.datas[0]
        if (typeof dataTemp === 'undefined') {
          res = '无条件解锁\n'
        } else {
          for (let i = 0; i < dataTemp.length; i++) {
            res += `在模块【${dataTemp[i].name}】中获得【${
              dataTemp[i].num
            } 分】<br>`
          }
        }
      } else {
        res = '获取解锁条件错误！'
      }
      return res
    },
    async getBlocks () {
      let params = new URLSearchParams()
      let username = this.$store.getters.getUsername
      if (username === '') {
        this.$message({ message: '登录后重试！', type: 'error' })
        return
      }
      this.logger.p({ username: username })
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
        this.$message({ message: '未找到挑战模块！', type: 'error' })
        return
      }
      this.dataBlocks = dataGetBlocks.datas[0]
      this.conditions = dataGetBlocks.datas[1]
      // console.log(dataGetBlocks)
      this.loadEchartsSeries()
    },
    loadEchartsSeries () {
      let datas = []
      let myLinks = []
      // for (let i = 0; i < 20; i++) {
      for (let i = 0; i < this.dataBlocks.length; i++) {
        let dataTemp = {
          // TODO:力动态模式在显示模块多的时候略卡，有需要的到时候做一个坐标系布局的
          // x: 100,
          // y: 100,
          // value: 10,
          id: this.dataBlocks[i].id,
          name: 'n' + this.dataBlocks[i].id,
          category: this.dataBlocks[i].locked
            ? 2
            : this.dataBlocks[i].totalScore === this.dataBlocks[i].getScore
              ? 0
              : 1,
          // 根据模块的分数动态调整圆圈大小
          symbolSize:
            Math.ceil(Math.sqrt(this.dataBlocks[i].totalScore + 20)) * 15,
          getScored: this.dataBlocks[i].getScore,
          notScored:
            this.dataBlocks[i].totalScore - this.dataBlocks[i].getScore,
          locked: this.dataBlocks[i].locked,
          // draggable: true,
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
      this.logger.i('得到模块数：' + datas.length)
      for (let i = 0; i < this.conditions.length; i++) {
        let condTemp = {
          source: '' + this.conditions[i].belongBlockId + '',
          target: '' + this.conditions[i].par + ''
        }
        myLinks.push(condTemp)
      }

      // console.log(myLinks)
      this.showEchartsView(datas, myLinks)
    },
    showEchartsView (datas, myLinks) {
      let _this = this
      let option = {
        title: {
          text: '挑战关系图',
          top: 20,
          left: 40
        },
        legend: {
          top: 50,
          left: 40,
          selectedMode: 'multiple'
          // data: this.myCategories.map(function (a) {
          //   return a.name
          // })
        },
        // legendHoverLink: true,
        // hoverAnimation: true,
        cursor: 'pointer',
        backgroundColor: '#eeeeee',
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let blockName = params.data.label.formatter
            let getScored = params.data.getScored
            // let notScored = params.data.notScored
            let totalScore = params.data.getScored + params.data.notScored
            let lockedStr = ''
            let percent = ((getScored / totalScore) * 100).toFixed(2) + '%'
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
        series: [
          {
            type: 'graph',
            layout: 'force',
            // symbol: 'roundRect',
            force: {
              // layoutAnimation: false,
              initLayout: 'circular',
              repulsion: 800,
              edgeLength: 220
              // edgeSymbol: ['circle', 'arrow']
            },
            categories: this.myCategories,
            roam: true,
            lineStyle: {
              width: 0
              // type: 'solid',
              // curveness: 0
            },
            label: {
              normal: {
                show: true
              }
            },
            // TODO:获取相连节点
            links: myLinks,
            data: datas
            // links: [{source: '1', target: '2'},
            //   {source: '5', target: '9'},
            //   {source: '253', target: '5'}]
          }
        ]
      }
      // console.log(option.series[0].links)
      this.myChart.setOption(option)
      this.myChart.on('click', async function (params) {
        if (params.componentType === 'series') {
          // console.log(params)
          let blockId = params.data.id
          // TODO:获取解锁的前置条件内容
          let condition = await _this.getPerCondition(blockId)
          if (params.data.locked === true) {
            _this.logger.i(
              '\n选择的模块ID为：' +
                params.data.id +
                '\n模块名为：' +
                params.data.label.formatter
            )
            _this.$alert(
              `${condition}`,
              `模块【${params.data.label.formatter}】的解锁条件`,
              {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定'
              }
            )
          } else {
            _this.logger.i(
              '\n选择的模块ID为：' +
                params.data.id +
                '\n模块名为：' +
                params.data.label.formatter
            )
            _this.$router.push({
              path: '/ChallengeBlock',
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
#blockView {
  align-items: center;
  border: 0px;
  width: 100%;
  height: 800px;
  background-color: #eeeeee;
}
</style>
