<template>
  <div>
    <el-card shadow="hover">

      <el-row :gutter="30">
        <el-col :span="8">
          <el-card style="background-color:#CCCCFF;font-size:20px"
            shadow="hover">
            <span style="font-size:28px;display:block;margin-bottom:10px">{{todayData.salesVolume}}件</span>
            <span>今日销售量</span>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="background-color:#FFCCCC;font-size:20px"
            shadow="hover">
            <span style="font-size:28px;display:block;margin-bottom:10px">{{todayData.salesAmount}}元</span>
            <span>今日销售额</span>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="background-color:#CCFFFF;font-size:20px"
            shadow="hover">
            <span style="font-size:28px;display:block;margin-bottom:10px">{{todayData.orderVolume}}单</span>
            <span>今日订单量</span>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10"
        style="margin-top: 30px;">
        <!-- <el-col :lg="12"
          :md="12">
          <ECharts :options="weekLineOption"
            autoresize
            theme="light"></ECharts>
        </el-col> -->
        <el-col :lg="24"
          :md="24">
          <ECharts :options="monthLineOption"
            autoresize
            theme="light"></ECharts>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todayData: {},
      weekLineOption: {},
      monthLineOption: {},
      weekDay: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    }
  },
  mounted() {},
  created() {
    this.getMonthData()
  },
  methods: {
    getMonthData() {
      this.$http.get('/other/month').then(res => {
        if (res.data.code === 10000) {
          this.todayData = res.data.data[res.data.data.length - 1]
          // this.weekLineOption = {
          //   title: {
          //     text: '近一周销售额折线图',
          //     left: 'center'
          //   },
          //   tooltip: {
          //     trigger: 'axis',
          //     axisPointer: {
          //       type: 'cross',
          //       label: {
          //         backgroundColor: '#6a7985'
          //       }
          //     }
          //   },
          //   legend: {
          //     data: ['销售额'],
          //     left: 5
          //   },
          //   xAxis: {
          //     type: 'category',
          //     boundaryGap: false,
          //     data: res.data.data
          //       .slice(0, 7)
          //       .map(
          //         item =>
          //           this.weekDay[
          //             new Date(item.currentDate.substring(0, 10)).getDay()
          //           ]
          //       ),
          //     axisLabel: {
          //       interval: 0
          //     }
          //   },
          //   yAxis: [
          //     {
          //       name: '金额(单位/元)',
          //       type: 'value'
          //     }
          //   ],
          //   series: [
          //     {
          //       name: '销售额',
          //       type: 'line',
          //       data: res.data.data.slice(0, 7).map(item => item.salesAmount),
          //       areaStyle: {}
          //     }
          //   ]
          // }
          this.monthLineOption = {
            title: {
              text: '近三十日销售情况统计图',
              left: 'center'
            },
            grid: {
              top: '18%', // 等价于 y: '16%'
              left: '3%',
              right: '3%',
              bottom: '3%',
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            toolbox: {
              show: true,
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                dataView: { readOnly: true },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
              },
              right: 30
            },
            legend: {
              data: ['销售额', '订单量'],
              left: 20
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: res.data.data.map(
                item => item.currentDate.substring(8, 10) + ' 日'
              ),
              axisLabel: {
                interval: 0
              }
            },
            yAxis: [
              {
                name: '金额(单位/元)',
                type: 'value',
                axisLabel: {
                  formatter: '{value} 元'
                }
              },
              {
                name: '订单(单位/单)',
                type: 'value',
                axisLabel: {
                  formatter: '{value} 单'
                }
              }
            ],
            series: [
              {
                name: '销售额',
                type: 'line',
                // 设置折线上圆点大小
                symbolSize: 5,
                itemStyle: {
                  normal: { label: { show: true } }
                },
                data: res.data.data.map(item => item.salesAmount),
                markLine: {
                  data: [{ type: 'average', name: '平均值' }]
                },
                areaStyle: {
                  normal: {
                    // color: '#ffdd59' //改变区域颜色
                  }
                }
              },
              {
                name: '订单量',
                type: 'line',
                // 设置折线上圆点大小
                symbolSize: 5,
                yAxisIndex: 1,
                itemStyle: {
                  normal: { label: { show: true } }
                },
                data: res.data.data.map(item => item.orderVolume),
                markLine: {
                  data: [{ type: 'average', name: '平均值' }]
                },
                areaStyle: {
                  normal: {
                    // color: '#0be881' //改变区域颜色
                  }
                }
              }
            ]
          }
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.el-col {
  .el-card {
    margin-bottom: 10px;
    text-align: center;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.echarts {
  width: 100%;
}
</style>
