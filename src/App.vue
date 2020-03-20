<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
html,
body,
#app {
  background-color: #f4f4f4;
}

</style>
