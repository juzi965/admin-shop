<template>
  <el-container>
    <el-aside width="auto">
      <LeftMenu />
    </el-aside>
    <el-container>
      <el-header height="85px">
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  computed: {
    notifyList() {
      return this.$store.state.notifyList
    }
  },

  methods: {
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage() {
      console.log(
        'WebSocket连接发生错误   状态码：' + this.websocket.readyState
      )
    },
    setOnopenMessage() {
      console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
    },
    setOnmessageMessage(event) {
      this.$notify.warning({
        title: '收到一条通知',
        message: event.data,
        duration: 0
      })
      this.notifyList.push(event.data)
      this.$store.commit('setNotifyList', this.notifyList)
      // console.log('服务端返回：' + event.data)
    },
    setOncloseMessage() {
      console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
    },
    onbeforeunload() {
      this.closeWebSocket()
    },
    closeWebSocket() {
      this.websocket.close()
    }
  },
  mounted() {
    // WebSocket
    if ('WebSocket' in window) {
      this.websocket = new WebSocket(
        'ws://127.0.0.1:8888/websocket/' + this.$store.state.userInfo.id
      )
      this.initWebSocket()
    } else {
      this.$message.warning('当前浏览器不支持 WebSocket')
    }
  },
  beforeDestroy() {
    this.onbeforeunload()
  }
}
</script>
<style lang="less" scoped>
.el-header {
  color: #333;
  padding: 0px;
}
.el-aside {
  color: #333;
  text-align: center;
  padding: 0px 10px 0px 0px;
}
.el-main {
  padding: 10px 0px 0px 0px;
}
</style>
