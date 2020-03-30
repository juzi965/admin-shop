<template>
  <div>
    <el-card shadow="hover">

      <el-menu :default-active="this.$route.path"
        :collapse="this.$store.state.isCollapse"
        class="el-menu-vertical"
        unique-opened
        router>
        <img src="http://localhost:8089/logo/logo.png"
          width="100%">
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu v-for="menu in this.$store.state.userInfo.menuTree"
          :key="menu.id"
          :index="menu.id.toString()">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.menuName}} </span>
          </template>
          <el-menu-item v-for="children in menu.children"
            :key="children.id"
            :index="children.path">{{children.menuName}} </el-menu-item>
        </el-submenu>
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-shop"></i>
            <span slot="title">服装管理 </span>
          </template>
          <el-menu-item index="/clothing-add">上架服装 </el-menu-item>
          <el-menu-item index="/clothing-info">服装信息 </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理 </span>
          </template>
          <el-menu-item index="/order-info">订单信息 </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span slot="title">系统设置 </span>
          </template>
          <el-menu-item index="/menu-info">菜单管理 </el-menu-item>
          <el-menu-item index="/role-info">角色管理 </el-menu-item>
          <el-menu-item index="/user-info">用户管理 </el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'LeftMenu',
  data() {
    return {
      isCollapse: false,
      screenWidth: ''
    }
  },
  mounted() {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth
    }
  },
  watch: {
    screenWidth(val) {
      if (val > 960) {
        this.$store.commit('setCollapse', false)
      } else {
        this.$store.commit('setCollapse', true)
      }
    }
  },
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 150px;
}
.el-menu-vertical {
  min-height: 560px;
}
.el-submenu {
  span {
    margin-right: 20px;
  }
}
.el-menu {
  border-right: none;
}
</style>
