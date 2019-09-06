<template>
  <div class="block-body">
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header">挑战模式</div>
      <div id="blockView"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      myChart: '',
      dataBlocks: '',
      dataForChart: [],
      conditions: '',
      myTextStyle: {
        fontSize: '15',
        // color: 'white',
        fontWeight: 'bold'
      },
      // add by axiang [20190628] 为ECharts的graph节点设置类别属性
      myCategories: [
        {
          name: '全部完成',
          itemStyle: {
            borderColor: 'rgb(116, 207, 18)',
            borderWidth: 4,
            // shadowBlur: 40,
            // shadowColor: '#eeeeee',
            color: 'rgb(116, 207, 18)'
          }
        },
        {
          name: '部分完成',
          symbol: 'rect',
          itemStyle: {
            borderColor: '#ffcc00',
            borderWidth: 4,
            // shadowBlur: 40,
            // shadowColor: '#eeeeee',
            color: '#ffcc00'
          }
        },
        {
          name: '未解锁',
          itemStyle: {
            borderColor: '#EE3B3B',
            borderWidth: 4,
            // shadowBlur: 40,
            // shadowColor: '#eeeeee',
            color: '#EE3B3B'
          }
        }
      ]
    }
  },
  mounted () {
    if (this.$store.getters.getIsLogin) {
      this.init()
      this.getBlocks()
    } else {
      this.$notify({
        title: '提示',
        message: '登录后才能查看哦',
        type: 'warning',
        offset: 100,
        duration: 3000
      })
    }
  },
  destroyed () {
    // 离开这个组件销毁一次ECharts实例，如果不手动销毁，ECharts内部有一个计时器会永久存在，切换界面切换回去后会越来越卡。
    this.myChart.dispose()
  },
  methods: {
    init () {
      this.myChart = echarts.init(document.getElementById('blockView'))
      this.myChart.showLoading()
    },
    // add by axiang [20190628] 获取所有挑战模式模块的内容
    async getBlocks () {
      let params = new URLSearchParams()
      let username = this.$store.getters.getUsername
      this.logger.p({ username: username })
      params.append('username', username)
      let dataGetBlocks = await this.$http
        .get('/challenge/getAllChallengeBlocks', params)
        .catch(() => {
          this.myChart.hideLoading()
        })
      if (dataGetBlocks.code === 100) {
        //
      } else {
        this.$message({ message: '未找到挑战模块！', type: 'error' })
        return
      }
      this.dataBlocks = dataGetBlocks.datas[0]
      this.conditions = dataGetBlocks.datas[1]
      this.loadEchartsSeries()
    },
    // add by axiang [20190628] 对后端获取的数据进行处理以适应前端Echarts，包括节点，关联关系
    loadEchartsSeries () {
      let myLinks = []
      for (let i = 0; i < this.dataBlocks.length; i++) {
        let percent =
          (100.0 * this.dataBlocks[i].getScore) / this.dataBlocks[i].totalScore
        let dataTemp = {
          id: this.dataBlocks[i].id,
          // 根据锁定与否和是否全部答题设置节点类别
          category: this.dataBlocks[i].locked
            ? 2
            : this.dataBlocks[i].totalScore === this.dataBlocks[i].getScore
              ? 0
              : 1,
          // 根据模块的分值大小调整圆圈大小 目前计算公式为 ((总分+20)^(1/2))*15
          symbolSize:
            Math.ceil(Math.sqrt(this.dataBlocks[i].totalScore + 20)) * 15,
          getScored: this.dataBlocks[i].getScore,
          notScored:
            this.dataBlocks[i].totalScore - this.dataBlocks[i].getScore,
          locked: this.dataBlocks[i].locked,
          label: {
            normal: {
              formatter: this.dataBlocks[i].name,
              position: 'inside',
              show: true,
              textStyle: this.myTextStyle
            }
          },
          // 是否可拖动
          draggable: true,
          // TODO: 不同进度的显示图片不好看，要重做一套
          symbol:
            percent === 0
              ? 'path://m512,-3.44828c-282.768,0 -512,229.232 -512,512s229.232,512 512,512s512,-229.232 512,-512s-229.232,-512 -512,-512zm0,928c-229.744,0 -416,-186.256 -416,-416c0,-114.872 42.68469,-218.00993 116.02704,-292.8609c73.34234,-74.85096 177.34234,-121.41496 299.97296,-123.1391c127.7623,1.34115 252.07633,87.16506 283.2869,105.74759l10.8731,16.09241c116.65931,145.96966 121.84,179.28 121.84,294.16c0,229.744 -186.256,416 -416,416z'
              : percent <= 12.5
                ? 'path://M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zM512 928C282.256 928 96 741.744 96 512 96 282.256 282.256 96 512 96l0 416 294.16-294.16C881.44 293.12 928 397.12 928 512 928 741.744 741.744 928 512 928z'
                : percent <= 25
                  ? 'path://M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zM512 928C282.256 928 96 741.744 96 512 96 282.256 282.256 96 512 96l0 416 416 0C928 741.744 741.744 928 512 928z'
                  : percent <= 37.5
                    ? 'path://M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zM512 928C282.256 928 96 741.744 96 512 96 282.256 282.256 96 512 96l0 416 294.16 294.16C730.88 881.44 626.88 928 512 928z'
                    : percent <= 50
                      ? 'path://M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zM512 928C282.256 928 96 741.744 96 512 96 282.256 282.256 96 512 96L512 928z'
                      : percent <= 62.5
                        ? 'path://M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zM512 512 217.84 806.16C142.56 730.88 96 626.88 96 512 96 282.256 282.256 96 512 96L512 512z'
                        : percent <= 75
                          ? 'path://M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zM512 512 96 512C96 282.256 282.256 96 512 96L512 512z'
                          : percent < 100
                            ? 'path://M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zM512 512 217.84 217.84C293.12 142.56 397.12 96 512 96L512 512z'
                            : 'path://M512 0c282.781538 0 512 229.218462 512 512S794.781538 1024 512 1024s-512-229.218462-512-512S229.218462 0 512 0z'
        }
        this.dataForChart.push(dataTemp)
      }
      this.logger.p({ '得到模块数：': this.dataForChart.length })
      for (let i = 0; i < this.conditions.length; i++) {
        let condTemp = {
          source: '' + this.conditions[i].belongBlockId + '',
          target: '' + this.conditions[i].par + ''
        }
        myLinks.push(condTemp)
      }
      this.showEchartsView(this.dataForChart, myLinks)
    },
    // add by axiang [20190628] 配置ECharts，并把处理过的节点列表datas和关联关系myLinks的数据装载入ECharts中
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
        },
        // legendHoverLink: true,
        // hoverAnimation: true,
        cursor: 'pointer',
        // backgroundColor: '#eeeeee',
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.dataType === 'node') {
              let blockName =
                typeof params.data.label === 'undefined'
                  ? '【出错了】'
                  : params.data.label.formatter
              let getScored = params.data.getScored
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
            // symbol: 'none',
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
              width: 1,
              type: 'solid',
              curveness: 0
            },
            label: {
              normal: {
                show: true
              }
            },
            links: myLinks,
            data: datas
          }
        ]
      }
      this.myChart.setOption(option)
      // add by axiang [20190701] 对ECharts的节点设置单击监听器
      this.myChart.on('click', async function (params) {
        if (params.componentType === 'series') {
          if (params.seriesType === 'graph') {
            // 鼠标点击位置在节点上才会执行以下内容
            if (params.dataType === 'node') {
              let blockId = params.data.id
              // 获取解锁的前置条件内容
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
            }
          }
        }
      })

      this.myChart.hideLoading()
      // let i = 0
      // this.myChart.nodes.forEach(function (node) {
      //   node.itemStyle = null
      //   node.value = node.symbolSize
      //   node.symbolSize /= 1.5
      //   node.label = {
      //     normal: {
      //       show: node.symbolSize > 30
      //     }
      //   }
      //   node.category = this.dataBlocks[i].locked
      //     ? 2
      //     : this.dataBlocks[i].totalScore === this.dataBlocks[i].getScore
      //       ? 0
      //       : 1
      // })
    },
    // add by axiang [20190628] 获取解锁的前置条件内容
    async getPerCondition (blockId) {
      let res = ''
      let params = new URLSearchParams()
      params.append('blockId', blockId)
      let dataBlockCondition = await this.$http
        .get('/challenge/getCondition', params)
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      if (dataBlockCondition.code === 100) {
        let dataTemp = dataBlockCondition.datas[0]
        if (typeof dataTemp === 'undefined') {
          res = '无解锁条件\n'
        } else {
          for (let i = 0; i < dataTemp.length; i++) {
            res += `在模块【${dataTemp[i].name}】中获得【${
              dataTemp[i].num
            } 分】<br>`
          }
        }
      } else {
        res = '【获取解锁条件错误！】'
      }
      return res
    }
  }
}
</script>

<style scoped>
.block-body {
  width: 85%;
  height: 100%;
  min-height: 800px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

#blockView {
  /* align-items: center; */
  /* border: 1px solid gray; */
  width: 100%;
  height: 800px;
  /* background-color: #eeeeee; */
}
</style>
