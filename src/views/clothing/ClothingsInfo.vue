<template>
  <div>
    <el-card shadow="hover">
      <div slot="header"
        class="clearfix">
        <span>服装信息</span>
        <el-input placeholder="请输入关键字"
          prefix-icon="el-icon-search"
          size="small"
          v-model="keyWord"
          @keyup.enter.native="getData"
          style="float: right;width: 25%;"></el-input>

      </div>
      <el-table :data="pageInfo.list"
        border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.clothingAttrList"
              border
              size="mini">
              <el-table-column prop="size"
                label="尺寸">
              </el-table-column>
              <el-table-column prop="price"
                label="单价">
              </el-table-column>
              <el-table-column prop="stock"
                label="库存量">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.clothingName)"></span>
          </template>
        </el-table-column>
        <el-table-column label="类别">
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.category)"></span>
          </template>
        </el-table-column>
        <el-table-column label="介绍"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.clothingContent)"></span>
          </template>
        </el-table-column>
        <el-table-column label="图片数量"
          align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.pictureInfoList.length === 0 ? 'danger' : 'success'"
              disable-transitions>{{scope.row.pictureInfoList.length}} 张</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime"
          label="上架时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small"
              type="warning"
              icon="el-icon-edit"
              circle
              @click="editClothing(scope.row.id)"></el-button>
            <el-button size="small"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteClothing(scope.$index, scope.row.id)"></el-button>
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
      pageInfo: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
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
      let key
      if (this.keyWord === '') {
        key = '全部'
      } else {
        key = this.keyWord
      }
      this.$http
        .get(
          '/clothing/category/' +
            key +
            '/' +
            this.currentPage +
            '/' +
            this.pageSize
        )
        .then(res => {
          if (res.data.code == 10000) {
            this.pageInfo = res.data.data
          } else {
            this.$message.warning(res.data.message)
          }
        })
    },
    deleteClothing(index, id) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const qs = require('qs')
          this.$http
            .post('/clothing/delete', qs.stringify({ id: id }))
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
    editClothing(id) {
      this.$router.push({
        path: '/clothing-edit',
        query: {
          id: id
        }
      })
    }
  },

  components: {}
}
</script>

<style lang="less" scoped>
</style>
