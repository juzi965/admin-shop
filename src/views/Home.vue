<template>
  <el-container>
    <el-header height="65px">
      <Header />
    </el-header>
    <el-container>
      <el-aside style="width: 201px;">
        <LeftMenu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script></script>
<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>
