<template>
  <div>
    <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">服装管理</span>
        </template>
        <el-menu-item index="/add-clothing">上架服装</el-menu-item>
        <el-menu-item index="1-2">服装信息</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="2-1">商品发货</el-menu-item>
        <el-menu-item index="2-2">订单信息</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'LeftMenu',
  data () {
    return {}
  },
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
