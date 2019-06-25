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
            shadowBlur: 100,
            shadowColor: 'rgb(116, 207, 18)',
            color: 'rgb(116, 207, 18)'
          }
        },
        Solving: {
          normal: {
            borderColor: 'rgb(206, 188, 11)',
            borderWidth: 4,
            shadowBlur: 100,
            shadowColor: 'rgb(206, 188, 11)',
            color: 'rgb(206, 188, 11)'
          }
        },
        Locked: {
          normal: {
            borderColor: 'rgb(137, 37, 21)',
            borderWidth: 4,
            shadowBlur: 100,
            shadowColor: 'rgb(137, 37, 21)',
            color: 'rgb(137, 37, 21)'
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
      let dataGetBlocks = await this.$http
        .post('/challenge/getAllChallengeBlocks')
        .catch(() => {
          this.$message({ message: '服务器繁忙，请稍后再试！', type: 'error' })
        })
      if (dataGetBlocks.code === 100) {
        // TODO:
        this.$message({message: '获取挑战模块成功!', type: 'success'})
      } else {
        this.$message({message: '未找到挑战模块！', type: 'error'})
      }
      this.dataBlocks = dataGetBlocks.datas[0]
      //
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
          // TODO:根据模块的分数动态调整圆圈大小
          symbolSize: 80,
          getScored: 10,
          notScored: 20,
          isLocked: false,
          // draggable: true,
          // TODO:根据题目状态来设置颜色，红色表示未解锁，绿色表示全部完成，黄色表示还在解答
          itemStyle: Math.random() > 0.5 ? this.myItemStyle.Solving : Math.random() > 0.5
            ? this.myItemStyle.Solved : this.myItemStyle.Locked,
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
        tooltip: {},
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
            edgeLength: 160,
            edgeSymbol: ['circle', 'arrow']
          },
          roam: true,
          label: {
            normal: {
              show: true
            }
          },
          // TODO:获取相连节点
          links: [{
            source: '3',
            target: '4'
          }],
          data: datas
        }]}

      this.myChart.setOption(option)
      this.myChart.on('click', function (params) {
        if (params.componentType === 'series') {
          // console.log(params)
          let blockId = params.data.id
          // TODO:获取解锁的前置条件内容
          let condition = _this.getPerCondition(blockId)
          if (params.data.isLocked === true) {
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
  width: 100%;
  height: 1000px;
  background-color: #eeeeee

}
</style>
