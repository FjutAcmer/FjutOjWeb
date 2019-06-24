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
      // 解锁模块的得分 绿色环
      itemStyleUnlockGreen: {
        normal: {
          color: 'green'
        }
      },
      // 解锁模块的未得分 灰色环
      itemStyleUnlockGray: {
        normal: {
          color: 'gray'
        }
      },
      // 未解锁模块的黑色字体
      itemStyleLockBlack: {
        normal: {
          color: 'black'
        }
      },
      // 未解锁模块的 红色环
      itemStyleLockRed: {
        normal: {
          color: 'red'
        }
      },
      // 所有圆环的坐标
      coordinates: [
        [500, 500],
        [560, 108],
        [410, 370]
      ]
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
          lockScore: 60,
          unlockScore: 40
        },
        {
          id: 2,
          name: '基础题',
          isLock: false,
          lockScore: 100,
          unlockScore: 80
        },
        {
          id: 3,
          name: '概率论入门啊',
          isLock: true,
          lockScore: 100,
          unlockScore: 25
        }
      ]
      this.dataBlock = dataTest
    },
    loadBlocksData () {
      for (let i = 0; i < this.dataBlock.length; i++) {
        let cycData = []
        if (this.dataBlock[i].isLock) {
          cycData.push({
            value: 0,
            name: '未解锁得分',
            label: {
              normal: {
                formatter: this.dataBlock[i].name,
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            itemStyle: this.itemStyleLockBlack
          })
          cycData.push({
            value: 100,
            name: '未解锁得分',
            itemStyle: this.itemStyleLockRed
          })
        } else {
          cycData.push({
            value: this.dataBlock[i].unlockScore,
            name: '已解锁得分',
            label: {
              normal: {
                formatter: this.dataBlock[i].name,
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  fontWeight: 'bold'
                }
              }
            },
            itemStyle: this.itemStyleUnlockGreen
          })
          cycData.push({
            value: this.dataBlock[i].lockScore,
            name: '未解锁得分',
            itemStyle: this.itemStyleUnlockGray
          })
        }
        this.series.push(
          {
            name: this.dataBlock[i].name,
            type: 'pie',
            radius: [42, 50],
            itemStyle: this.dataStyle,
            hoverAnimation: false,
            center: this.coordinates[i],
            data: cycData
          }
        )
      }
    },
    showCallengeView () {
      let myChart = echarts.init(document.getElementById('showCallengeView'))
      myChart.showLoading()
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '模块：【{a}】：<br/> {b} {c} ({d}%)'
        },
        title: {
          text: '挑战关系图',
          top: 50,
          left: 50
        },
        animationDuration: 2000,
        animationEasingUpdate: 'quinticInOut',
        series: this.series
      }
      myChart.setOption(option)
      myChart.hideLoading()
    }
  }
}
</script>

<style scoped>
</style>
