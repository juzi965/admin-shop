<template>
  <div>
    <el-card shadow="hover">
      <div slot="header"
        class="clearfix">
        <span>菜单信息</span>
        <el-button size="small"
          @click="add()"
          style="float: right;"
          type="primary"> 新增菜单</el-button>
      </div>
      <el-input placeholder="请输入关键字"
        prefix-icon="el-icon-search"
        size="small"
        v-model="filterText"
        style="margin-bottom:20px" />
      <div class="custom-tree-node">
        <span>菜单名称</span>
        <span>菜单图标</span>
        <span>菜单路径</span>
        <span>操作</span>
      </div>
      <el-tree :data="menuList"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="menuTree">
        <span class="custom-tree-node"
          slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>{{ data.icon }}</span>
          <span>{{ data.path }}</span>

          <span>
            <el-button type="warning"
              size="mini"
              style="padding:4px"
              @click="edit(data)">
              编辑
            </el-button>
            <el-button type="danger"
              style="padding:4px"
              size="mini"
              @click="deleteMenu(data)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
      <el-dialog title="修改菜单信息"
        :visible.sync="editDialog"
        width="30%">

        <el-form ref="menuFormRef"
          class="login_form"
          :model="menuInfoFrom">
          <el-form-item label="菜单名称">
            <el-input placeholder="请输入名称"
              v-model="menuInfoFrom.menuName" />
          </el-form-item>
          <el-form-item label="菜单路径">
            <el-input placeholder="请输入路径"
              v-model="menuInfoFrom.path" />
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input placeholder="请输入图标"
              v-model="menuInfoFrom.icon" />
          </el-form-item>
          <el-form-item label="父菜单">
            <el-select v-model="menuInfoFrom.parentId"
              placeholder="请选择父菜单">
              <el-option label="无父级菜单"
                :value="-1"></el-option>
              <el-option v-for="(item,index) in menuList.filter(item =>item.parentId===-1) "
                :key="index"
                :label="item.menuName"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer"
          class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary"
            @click="editMenu()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyWord: '',
      filterText: '',
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      editDialog: false,
      menuInfoFrom: {
        id: '',
        menuName: '',
        patch: '',
        icon: '',
        parentId: ''
      }
    }
  },

  created() {
    this.getData()
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.menuName.indexOf(value) !== -1
    },
    add() {
      this.menuInfoFrom = {}
      this.editDialog = true
    },
    edit(data) {
      this.menuInfoFrom = {}
      this.menuInfoFrom = data
      this.editDialog = true
    },
    editMenu() {
      const qs = require('qs')
      this.$http
        .post('/menu/save', qs.stringify(this.menuInfoFrom))
        .then(res => {
          if (res.data.code == 10000) {
            this.editDialog = false
            this.getData()
            this.$message.success('操作成功')
          } else {
            this.$message.warning(res.data.message)
          }
        })
    },
    deleteMenu(data) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const qs = require('qs')
          this.$http
            .post('/menu/delete', qs.stringify({ id: data.id }))
            .then(res => {
              if (res.data.code == 10000) {
                this.getData()
                this.$message.success('删除成功')
              } else {
                this.$message.warning(res.data.message)
              }
            })
        })
        .catch(() => {
          this.$message.warning('取消删除')
        })
    },
    getData() {
      let menuName
      if (this.keyWord === '') {
        menuName = 'all'
      } else {
        menuName = this.keyWord
      }
      this.$http.get('/menu/' + menuName).then(res => {
        if (res.data.code == 10000) {
          this.menuList = res.data.data
        } else {
          this.$message.warning(res.data.message)
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
