<template>
  <div id="showCallengeView" style="width:100%;height:800px"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      dataBlock: [],
      series: [],
      // 全局图形样式
      dataStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      // 环的大小
      ringSize: {
        small: [33, 40],
        mid: [43, 50],
        large: [53, 60]
      },
      // 解锁模块的得分 绿色环
      itemStyleUnlockGreen: {
        normal: {
          // color: '#00AB00'
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'lightgreen' // 0% 处的颜色
            }, {
              offset: 1, color: '#00AB00' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      },
      // 解锁模块的未得分 灰色环
      itemStyleUnlockGray: {
        normal: {
          color: 'gray'
        }
      },
      // 未解锁模块的 红色环
      itemStyleLockRed: {
        normal: {
          // color: 'red'
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'pink' // 0% 处的颜色
            }, {
              offset: 1, color: 'red' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      },
      // 所有圆环的坐标
      coordinates: [[500, 500], [560, 108], [410, 370], [660, 340]]
    }
  },
  mounted () {
    this.getBlocksData()
    this.loadBlocksData()
    this.showCallengeView()
  },
  methods: {
    getBlocksData () {
      // TODO:从数据库获取模块信息，装入dataBlock[] 内
      let dataTest = [
        {
          id: 1,
          name: '入门',
          isLock: false,
          getScored: 33,
          notScored: 21
        },
        {
          id: 2,
          name: '基础题',
          isLock: false,
          getScored: 21,
          notScored: 5
        },
        {
          id: 3,
          name: '概率论入门',
          isLock: true,
          getScored: 1,
          notScored: 2
        },
        {

          id: 4,
          name: '大佬课程',
          isLock: false,
          getScored: 5,
          notScored: 0

        }
      ]
      this.dataBlock = dataTest
    },
    getPerCondition (blockId) {
      return '入门 10 分'
    },
    loadBlocksData () {
      for (let i = 0; i < this.dataBlock.length; i++) {
        let cycData = []
        // 根据是否解锁来动态配置echarts实例的series属性
        if (this.dataBlock[i].isLock) {
          cycData.push({
            value: 0,
            name: '未解锁',
            label: {
              normal: {
                formatter: this.dataBlock[i].name,
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  color: 'black'
                  // fontWeight: 'bold'
                }
              }
            },
            itemStyle: this.itemStyleLockBlack
          })
          cycData.push({
            value: 100,
            name: '未解锁',
            label: {
              normal: {
                formatter: this.dataBlock[i].name,
                show: false
              }
            },
            itemStyle: this.itemStyleLockRed
          })
        } else {
          cycData.push({
            value: this.dataBlock[i].getScored,
            name: '已得分',
            label: {
              normal: {
                formatter: this.dataBlock[i].name,
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  color: '#337ab7'
                  // fontWeight: 'bold'
                }
              }
            },
            itemStyle: this.itemStyleUnlockGreen
          })
          cycData.push({
            value: this.dataBlock[i].notScored,
            name: '未得分',
            label: {
              normal: {
                formatter: this.dataBlock[i].name,
                show: false
              }
            },
            itemStyle: this.itemStyleUnlockGray
          })
        }
        let totalScore = this.dataBlock[i].getScored + this.dataBlock[i].notScored
        // 暂存于实例内的series
        this.series.push({
          name: this.dataBlock[i].id,
          type: 'pie',
          radius:
          (totalScore > 30) ? this.ringSize.large
            : (totalScore > 10) ? this.ringSize.mid : this.ringSize.small,
          itemStyle: this.dataStyle,
          hoverAnimation: false,
          center: this.coordinates[i],
          data: cycData
        })
      }
    },
    showCallengeView () {
      // 获取vue实例，以便在myChart内操作
      let _this = this
      let myChart = echarts.init(document.getElementById('showCallengeView'))
      myChart.showLoading()
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let blockName = params.data.label.formatter
            let scoreType = ''
            let scoreValue = params.data.value
            let percent = params.percent + '%'
            if (params.name === '已得分') {
              scoreType = '已得分：'
            } else if (params.name === '未得分') {
              scoreType = '未得分：'
            } else {
              scoreType = '未解锁'
              scoreValue = ''
              percent = ''
            }
            return `模块【${blockName}】【${scoreType}${scoreValue}】，占比【${percent}】`
          }
        },
        title: {
          text: '挑战关系图',
          top: 50,
          left: 50
        },
        animationDuration: 2000,
        animationEasingUpdate: 'quinticInOut',
        // 把暂存的装载入series属性
        series: this.series
      }
      myChart.setOption(option)
      myChart.hideLoading()
      myChart.on('click', function (params) {
        if (params.componentType === 'series') {
          let blockId = params.seriesName
          // TODO:获取解锁的前置条件内容
          let condition = _this.getPerCondition(blockId)
          if (params.name === '未解锁') {
            _this.$alert(
              `${condition}`,
              `模块【${params.data.label.formatter}】的解锁条件`,
              {
                confirmButtonText: '确定'
              }
            )
          } else {
            _this.logger.i(
              '\n选择的模块ID为：' +
                params.seriesName +
                '\n模块名为：' +
                params.data.label.formatter
            )
            _this.$router.push({
              path: '/CallengeBlock',
              query: { id: params.seriesName }
            })
          }
          console.log(params)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
