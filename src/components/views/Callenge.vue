FIXME: 后端的数据不准确，需要重新设置
TODO:暂时显示全部模块； 后期在后端中设置只显示已解锁模块和待解锁模块
TODO:需要考虑下是否需要更换Echarts类型，这个控件内用的无法拖拽，如果不更换需要手动布置坐标

<template>
  <div id="showCallengeView" style="width:1200px;height:1000px;"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  created () {
  },
  data () {
    return {
      dataBlocks: [],
      series: [],
      myChart: '',
      // 全局图形样式
      itemStyle: {
        normal: {
          // borderColor: '#000',
          // borderType: 'solid',
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          // color: 'red', // 颜色
          borderColor: '#000', // 边框颜色
          borderWidth: 0, // 柱条的描边宽度，默认不描边。
          borderType: 'solid', // 柱条的描边类型，默认为实线，支持 'dashed', 'dotted'。
          barBorderRadius: 0, // 柱形边框圆角半径，单位px，支持传入数组分别指定柱形4个圆角半径。
          shadowBlur: 10, // 图形阴影的模糊大小。
          shadowColor: '#000', // 阴影颜色
          shadowOffsetX: 0, // 阴影水平方向上的偏移距离。
          shadowOffsetY: 0, // 阴影垂直方向上的偏移距离。
          opacity: 1 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。

        }
      },
      // 环的大小
      ringSize: {
        small: [23, 30],
        mid: [33, 40],
        large: [43, 50]
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
      coordinates: [
      ]
    }
  },
  mounted () {
    this.loadCoordinates()
    this.getBlocksData()
  },
  methods: {
    loadCoordinates () {
      for (let i = 100; i <= 6000; i += 60) {
        for (let j = 100; j <= 500; j += 60) {
          this.coordinates.push([i, j])
        }
      }
    },
    async getBlocksData () {
      // TODO:从数据库获取模块信息，装入dataBlocks[] 内
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
        return
      }
      // FIXME:后端传来的数据不正确，需要修改！！！
      let dataTempBlocks = dataGetBlocks.datas[0]
      let dataTempBlockScores = dataGetBlocks.datas[1]
      console.log(dataTempBlocks.length + '--' + dataTempBlockScores.length)
      console.log(dataTempBlockScores)
      for (let i = 0; i < dataTempBlocks.length; i++) {
        let dataTempBlock = {
          id: dataTempBlocks[i].id,
          name: dataTempBlocks[i].name,
          isLock: false,
          getScored: dataTempBlockScores[i],
          notScored: 0
        }
        this.dataBlocks.push(dataTempBlock)
      }
      this.loadBlocksData()
      this.showCallengeView()
    },
    getPerCondition (blockId) {
      return '入门 10 分'
    },
    loadBlocksData () {
      for (let i = 0; i < this.dataBlocks.length; i++) {
        let cycData = []
        // 根据是否解锁来动态配置echarts实例的series属性
        if (this.dataBlocks[i].isLock) {
          cycData.push({
            value: 100,
            name: '未解锁',
            label: {
              normal: {
                formatter: this.dataBlocks[i].name,
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  color: 'black'
                  // fontWeight: 'bold'
                }
              }
            },
            itemStyle: this.itemStyleLockRed
          })
          cycData.push({
            value: 0,
            name: '未解锁',
            label: {
              normal: {
                formatter: this.dataBlocks[i].name,
                show: false
              }
            },
            itemStyle: this.itemStyleLockBlack
          })
        } else {
          cycData.push({
            value: this.dataBlocks[i].getScored,
            name: '已得分',
            label: {
              normal: {
                formatter: this.dataBlocks[i].name,
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '16',
                  color: '#337ab7'
                }
              }
            },
            itemStyle: this.itemStyleUnlockGreen
          })
          cycData.push({
            value: this.dataBlocks[i].notScored,
            name: '未得分',
            label: {
              normal: {
                formatter: this.dataBlocks[i].name,
                show: false
              }
            },
            itemStyle: this.itemStyleUnlockGray
          })
        }
        let totalScore = this.dataBlocks[i].getScored + this.dataBlocks[i].notScored
        // 暂存于实例内的series
        this.series.push({
          // draggable: true,
          cursor: 'pointer',
          name: this.dataBlocks[i].id,
          type: 'pie',
          radius:
          (totalScore > 30) ? this.ringSize.large
            : (totalScore > 10) ? this.ringSize.mid : this.ringSize.small,
          itemStyle: this.itemStyle,
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
      this.myChart = myChart
      myChart.showLoading()
      let option = {
        id: 'myCharts',
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
              return `模块【${blockName}】<br/>【${scoreType}】`
            }
            return `模块【${blockName}】<br/>【${scoreType}${scoreValue}】，【占比：${percent}】`
          }
        },
        title: {
          text: '挑战关系图',
          top: 50,
          left: 50
        },
        animationDuration: 2000,
        animationEasingUpdate: 'quinticInOut',
        // 把暂存的装入series属性
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
