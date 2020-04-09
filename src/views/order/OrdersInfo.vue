<template>
  <div>
    <el-card shadow="hover">
      <div slot="header"
        class="clearfix">
        <span>订单信息</span>
        <el-input placeholder="请输入关键字"
          prefix-icon="el-icon-search"
          size="small"
          v-model="keyWord"
          @keyup.enter.native="getData"
          style="float: right;width: 25%;"></el-input>

      </div>
      <el-table :data="pageInfo.list"
        border
        highlight-current-row>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.orderItem"
              border
              size="mini">
              <el-table-column prop="clothingName"
                label="服装名城">
              </el-table-column>
              <el-table-column prop="category"
                label="服装类别">
              </el-table-column>
              <el-table-column prop="clothingContent"
                label="服装介绍"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="size"
                label="尺寸">
              </el-table-column>
              <el-table-column prop="price"
                label="单价">
              </el-table-column>
              <el-table-column prop="num"
                label="数量">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="订单号"
          width="150"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="font-size:12px"
              v-html="showDate(scope.row.orderId)"></span>
          </template>
        </el-table-column>
        <el-table-column label="下单用户"
          width="90"
          align="center">
          <template slot-scope="scope">
            <span style="font-size:12px"
              v-html="showDate(scope.row.userName)"></span>
          </template>
        </el-table-column>
        <el-table-column label="收件人"
          width="70"
          align="center">
          <template slot-scope="scope">
            <span style="font-size:12px"
              v-html="showDate(scope.row.recipient)"></span>
          </template>
        </el-table-column>
        <el-table-column label="手机号"
          width="100"
          align="center">
          <template slot-scope="scope">
            <span style="font-size:12px"
              v-html="showDate(scope.row.phoneNum)"></span>
          </template>
        </el-table-column>
        <el-table-column label="收件地址"
          min-width="130"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="font-size:12px"
              v-html="showDate(scope.row.address)"></span>
          </template>
        </el-table-column>
        <el-table-column label="总金额"
          width="90"
          align="center">
          <template slot-scope="scope">
            <span style="font-size:13px">{{scope.row.totalPrice}}￥</span>
          </template>
        </el-table-column>
        <el-table-column label="快递号"
          min-width="90"
          align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.expressNum === '' "
              type="primary"
              disable-transitions
              @click="send(scope.row.orderId)"
              style="font-size:12px;cursor:pointer">去发货</el-tag>
            <span v-else
              style="font-size:12px;cursor:pointer"
              v-html="showDate(scope.row.expressNum)"
              @click="kdi(scope.row.expressNum,scope.row.orderId)"></span>
          </template>
        </el-table-column>
        <el-table-column label="支付状态"
          align="center"
          width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.payFlag === 0 "
              type="danger"
              disable-transitions>未支付</el-tag>
            <el-tag v-if="scope.row.payFlag === 1 "
              type="success"
              disable-transitions>已支付</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="确认收货"
          align="center"
          width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.orderFlag === 0 "
              type="danger"
              disable-transitions>未确认</el-tag>
            <el-tag v-if="scope.row.orderFlag === 1 "
              type="success"
              disable-transitions>已确认</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间"
          width="150"
          align="center">
          <template slot-scope="scope">
            <span style="font-size:12px">{{scope.row.createTime}}</span>
          </template>
        </el-table-column>

      </el-table>
      <div style="text-align: center; margin-top:20px">
        <el-pagination :page-size="5"
          :page-sizes="[2, 5, 10, 50]"
          layout="total,sizes,prev, pager, next"
          @current-change="changeCurrentPage"
          @size-change="changeSizePage"
          :total="pageInfo.total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="物流信息"
      :visible.sync="dialogVisible"
      width="30%">
      <el-button type="primary"
        style="float:right"
        icon="el-icon-edit"
        @click="sendDialog2 = true"
        circle></el-button>
      <el-table :data="kdiInfo">
        <el-table-column width="150"
          property="time"
          label="日期"></el-table-column>
        <el-table-column property="status"
          label="状态"></el-table-column>
      </el-table>
      <el-dialog title="物流信息"
        :visible.sync="sendDialog2"
        width="30%"
        append-to-body>
        <el-input v-model="expressNum"
          placeholder="请输入快递单号"></el-input>
        <span slot="footer"
          class="dialog-footer">
          <el-button @click="sendDialog2 = false">取 消</el-button>
          <el-button type="primary"
            @click="sendTo()">确 定</el-button>
        </span>
      </el-dialog>

    </el-dialog>
    <el-dialog title="物流信息"
      :visible.sync="sendDialog"
      width="30%">
      <el-input v-model="expressNum"
        placeholder="请输入快递单号"></el-input>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="sendDialog = false">取 消</el-button>
        <el-button type="primary"
          @click="sendTo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyWord: '',
      currentPage: 1,
      pageSize: 5,
      pageInfo: {},
      kdiInfo: [],
      dialogVisible: false,
      sendDialog: false,
      sendDialog2: false,
      expressNum: '',
      orderId: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    send(id) {
      this.sendDialog = true
      this.orderId = id
    },
    sendTo() {
      const qs = require('qs')
      this.$http
        .post(
          '/order/send',
          qs.stringify({ orderId: this.orderId, expressNum: this.expressNum })
        )
        .then(res => {
          this.sendDialog = false
          this.sendDialog2 = false
          this.dialogVisible = false
          this.getData()
          this.$message.success('填写成功')
        })
    },
    kdi(no, id) {
      this.orderId = id
      const qs = require('qs')
      this.$http.post('/other/kdi', qs.stringify({ no: no })).then(res => {
        this.kdiInfo = res.data.data.result.list
        this.dialogVisible = true
      })
    },
    // 筛选变色
    showDate(val) {
      val = val + ''
      if (val.indexOf(this.keyWord) !== -1 && this.keyWord !== '') {
        return val.replace(
          this.keyWord,
          '<font color="#e6a23c" style="background-color: #fdf6ec;border-color: #faecd8;">' +
            this.keyWord +
            '</font>'
        )
      } else {
        return val
      }
    },
    changeCurrentPage(pageNum) {
      this.currentPage = pageNum
      this.getData()
    },
    changeSizePage(pageSize) {
      this.pageSize = pageSize
      this.getData()
    },
    getData() {
      let userName
      if (this.keyWord === '') {
        userName = 'all'
      } else {
        userName = this.keyWord
      }
      this.$http
        .get(
          '/order/' + userName + '/' + this.currentPage + '/' + this.pageSize
        )
        .then(res => {
          if (res.data.code == 10000) {
            this.pageInfo = res.data.data
          }
        })
    }
  },

  components: {}
}
</script>

<style lang="less" scoped>
</style>
