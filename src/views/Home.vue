<template>
  <div>
    <el-card shadow="hover">

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card style="background-color:#CCCCFF;font-size:20px"
            shadow="hover">
            今日销售量 <span style="font-size:30px">{{todayData.salesVolume}}</span> 件
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="background-color:#FFCCCC;font-size:20px"
            shadow="hover">
            今日销售额 <span style="font-size:30px">{{todayData.salesAmount}}</span> 元
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="background-color:#CCFFFF;font-size:20px"
            shadow="hover">
            今日订单 <span style="font-size:30px">{{todayData.orderVolume}}</span> 单
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10"
        style="margin-top: 30px;">
        <el-col :lg="12"
          :md="12">
          <ECharts :options="weekLineOption"
            autoresize
            theme="light"></ECharts>
        </el-col>
        <el-col :lg="12"
          :md="12">
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
      todayData: {
        salesVolume: 0,
        salesAmount: 0,
        orderVolume: 0
      },
      weekLineOption: {},
      monthLineOption: {},
      weekDay: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    }
  },
  mounted() {},
  created() {
    this.getTodayData()
    this.getMonthData()
  },
  methods: {
    getTodayData() {
      this.$http.get('/other/today').then(res => {
        if (res.data.code === 10000) {
          if (res.data.data != null) {
            this.todayData = res.data.data
          }
        }
      })
    },
    getMonthData() {
      this.$http.get('/other/month').then(res => {
        if (res.data.code === 10000) {
          this.weekLineOption = {
            title: {
              text: '近一周销售额折线图',
              left: 'center'
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
            legend: {
              data: ['销售额'],
              left: 5
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: res.data.data
                .slice(0, 7)
                .map(
                  item =>
                    this.weekDay[
                      new Date(item.currentDate.substring(0, 10)).getDay()
                    ]
                ),
              axisLabel: {
                interval: 0
              }
            },
            yAxis: [
              {
                name: '金额(单位/元)',
                type: 'value'
              }
            ],
            series: [
              {
                name: '销售额',
                type: 'line',
                data: res.data.data.slice(0, 7).map(item => item.salesAmount),
                areaStyle: {}
              }
            ]
          }
          this.monthLineOption = {
            title: {
              text: '近三十日销售额折线图',
              left: 'center'
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
            legend: {
              data: ['销售额'],
              left: 5
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
                type: 'value'
              }
            ],
            series: [
              {
                name: '销售额',
                type: 'line',
                data: res.data.data.map(item => item.salesAmount),
                areaStyle: {
                  normal: {
                    color: '#8cd5c2' //改变区域颜色
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
