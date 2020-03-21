<template>
  <div>
    <el-card shadow="hover">
      <div slot="header"
        class="clearfix">
        <span>角色信息</span>
        <el-button @click="add()"
          size="small"
          style="float: right;"
          type="primary">
          新增角色
        </el-button>
        <el-input placeholder="请输入关键字"
          prefix-icon="el-icon-search"
          size="small"
          v-model="keyWord"
          @keyup.enter.native="getData"
          style="float: right;width: 25%; margin-right:20px" />

      </div>
      <el-table :data="pageInfo.list"
        border
        highlight-current-row>
        <el-table-column prop="id"
          label="ID">
        </el-table-column>
        <el-table-column prop="roleName"
          label="角色名">
        </el-table-column>
        <el-table-column prop="createTime"
          label="创建日期">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning"
              size="small"
              @click="edit(scope.row)"> 编辑</el-button>
            <el-button type="danger"
              size="small"
              @click="deleteRole(scope.row)"> 删除</el-button>
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
    <el-dialog title="修改菜单信息"
      :visible.sync="menuDialog"
      width="30%">
      <el-form :model="roleInfoForm">
        <el-form-item label="角色名">
          <el-input v-model="roleInfoForm.roleName"></el-input>
        </el-form-item>
        <el-tree :props="defaultProps"
          :data="menuList"
          show-checkbox
          node-key="id"
          :default-checked-keys="checkList"
          ref="menuTree">
        </el-tree>
      </el-form>
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="menuDialog = false">取 消</el-button>
        <el-button type="primary"
          @click="editRole()">确 定</el-button>
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
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      menuList: [],
      checkList: [],
      menuDialog: false,
      roleInfoForm: {}
    }
  },
  created() {
    this.getData()
    this.getMenuData()
  },
  methods: {
    add() {
      this.menuDialog = true
      this.$nextTick(() => {
        this.$refs.menuTree.setCheckedKeys([])
      })
      this.roleInfoForm = {}
    },
    deleteRole(data) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.roleInfoForm = data
          this.roleInfoForm.delFlag = -1
          const qs = require('qs')
          this.$http
            .post('/role/save', qs.stringify(this.roleInfoForm))
            .then(res => {
              if (res.data.code == 10000) {
                this.getData()
                this.$message.success('删除成功')
              }
            })
        })
        .catch(() => {
          this.$message.warning('取消删除')
        })
    },
    edit(data) {
      this.menuDialog = true
      this.$nextTick(() => {
        this.$refs.menuTree.setCheckedKeys([])
        this.roleInfoForm = data
        this.checkList = this.roleInfoForm.menuIds
      })
    },
    editRole() {
      this.roleInfoForm.menuIds = this.$refs.menuTree
        .getCheckedNodes()
        .map(item => item.id)
      const qs = require('qs')
      this.$http
        .post('/role/save', qs.stringify(this.roleInfoForm))
        .then(res => {
          if (res.data.code == 10000) {
            this.menuDialog = false
            this.getData()
            this.$message.success('操作成功')
          }
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
      let roleName
      if (this.keyWord === '') {
        roleName = 'all'
      } else {
        roleName = this.keyWord
      }
      this.$http
        .get('/role/' + roleName + '/' + this.currentPage + '/' + this.pageSize)
        .then(res => {
          if (res.data.code == 10000) {
            this.pageInfo = res.data.data
          }
        })
    },
    getMenuData() {
      let menuName
      if (this.keyWord === '') {
        menuName = 'all'
      } else {
        menuName = this.keyWord
      }
      this.$http.get('/menu/' + menuName).then(res => {
        if (res.data.code == 10000) {
          this.menuList = res.data.data
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
