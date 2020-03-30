<template>
  <div>
    <el-card shadow="hover">
      <div slot="header"
        class="clearfix">
        <span>用户信息</span>
        <el-button size="small"
          type="danger"
          @click="revoke"
          style="float: right; ">
          撤销
        </el-button>
        <el-button size="small"
          type="primary"
          @click="allocation"
          style="float: right;margin-right:10px">
          分配
        </el-button>

        <el-select placeholder="请选择"
          v-model="roleForm.roleId"
          size="small"
          style="float: right;width: 15%;margin-right:10px">
          <el-option v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-input placeholder="请输入关键字"
          prefix-icon="el-icon-search"
          size="small"
          v-model="keyWord"
          @keyup.enter.native="getData"
          style="float: right;width: 25%;margin-right:30px"></el-input>

      </div>
      <el-table :data="pageInfo.list"
        border
        @selection-change="handleSelectionChange"
        highlight-current-row>
        <el-table-column type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="userName"
          label="用户名">
        </el-table-column>
        <el-table-column prop="roleName"
          label="所属角色"
          align="center"
          width="90">
        </el-table-column>
        <el-table-column prop="gender"
          label="性别"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column prop="email"
          label="邮箱"
          width="150">
        </el-table-column>
        <el-table-column prop="phoneNum"
          label="手机号"
          width="120">
        </el-table-column>
        <el-table-column prop="birthday"
          label="生日"
          width="110"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="createTime"
          width="160"
          label="创建日期">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger"
              size="small"
              @click="resetPwd(scope.row.id)"> 重置密码</el-button>
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
      roleList: [],
      roleForm: {
        roleId: '',
        userIds: []
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSelectionChange(checkList) {
      this.roleForm.userIds = checkList.map(item => item.id)
    },
    allocation() {
      if (this.roleForm.roleId === '') {
        this.$message.warning('请选择角色')
        return
      }
      if (this.roleForm.userIds.length === 0) {
        this.$message.warning('请选择用户')
        return
      }
      const qs = require('qs')
      this.$http
        .post('/user/allocation', qs.stringify(this.roleForm))
        .then(res => {
          if (res.data.code == 10000) {
            this.getData()
            this.$message.success('分配成功')
          }
        })
    },
    revoke() {
      if (this.roleForm.userIds.length === 0) {
        this.$message.warning('请选择用户')
        return
      }
      console.log(this.roleForm)
      const qs = require('qs')
      this.$http.post('/user/revoke', qs.stringify(this.roleForm)).then(res => {
        if (res.data.code == 10000) {
          this.getData()
          this.$message.success('撤销成功')
        }
      })
    },
    dateFormat(row, column, cellValue, index) {
      return row.birthday.substring(0, 10)
    },
    resetPwd(id) {
      this.$confirm('确定重置密码？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const qs = require('qs')
          this.$http
            .post('/user/resetPwd', qs.stringify({ userId: id }))
            .then(res => {
              if (res.data.code == 10000) {
                this.getData()
                this.$message.success('重置成功，密码为123456')
              }
            })
        })
        .catch(() => {
          this.$message.warning('取消删除')
        })
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
        .get('/user/' + userName + '/' + this.currentPage + '/' + this.pageSize)
        .then(res => {
          if (res.data.code == 10000) {
            this.pageInfo = res.data.data
          }
        })
      this.$http.get('/role/all/1/20').then(res => {
        if (res.data.code == 10000) {
          this.roleList = res.data.data.list
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
