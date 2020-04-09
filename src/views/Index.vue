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
  data() {
    return {
      websocket: null,
      wurl:
        'wss://api.hooya.top:8080/websocket/' + this.$store.state.userInfo.id,
      // 心跳检测, 每隔一段时间检测连接状态，如果处于连接中，就向server端主动发送消息，来重置server端与客户端的最大连接时间，如果已经断开了，发起重连。
      heartCheck: null,
      timeout: 50000
    }
  },
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
      console.log('WebSocket连接发生错误  状态码：' + this.websocket.readyState)
    },
    setOnopenMessage() {
      console.log('WebSocket连接成功  状态码：' + this.websocket.readyState)
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
      console.log('WebSocket连接关闭  状态码：' + this.websocket.readyState)
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
      this.websocket = new WebSocket(this.wurl)
      this.initWebSocket()
    } else {
      this.$message.warning('当前浏览器不支持 WebSocket')
    }
    this.heartCheck = setInterval(() => {
      if (this.websocket.readyState === 1) {
        console.log('WebSocket心跳检测')
        this.websocket.send('ping')
      } else {
        console.log('断开状态')
      }
    }, this.timeout)
  },
  beforeDestroy() {
    this.onbeforeunload()
    clearInterval(this.heartCheck)
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
