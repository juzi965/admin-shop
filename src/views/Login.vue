<template>
  <el-container class="login_container">
    <el-main>
      <el-row type="flex"
        justify="center"
        class="login_row">
        <el-col :span="8">
          <el-card>
            <div class="avatar_box">
              <el-avatar :size="80"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <el-form ref="loginFormRef"
              class="login_form"
              :model="loginForm"
              :rules="loginFormRules">
              <el-form-item prop="accountName">
                <el-input placeholder="请输入账号"
                  prefix-icon="el-icon-user"
                  v-model="loginForm.accountName" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password"
                  placeholder="请输入密码"
                  prefix-icon="el-icon-lock"
                  v-model="loginForm.password" />
              </el-form-item>
              <el-form-item class="btns">
                <el-button type="primary"
                  @click="sublimtLogin">登录</el-button>
                <!-- <el-button type="info"
                  @click="reset">重置</el-button> -->
                <el-button type="info"
                  @click="registerDialog = true">注册</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-dialog title="注册"
      :visible.sync="registerDialog"
      width="40%">
      <el-form label-position="top"
        ref="userInfoFormRef"
        :model="userInfo"
        :rules="userInfoFormRules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名"
              prop="userName">
              <el-input v-model="userInfo.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号"
              prop="phoneNum">
              <el-input v-model="userInfo.phoneNum"></el-input>
            </el-form-item>

            <el-form-item label="新密码"
              prop="password">
              <el-input v-model="userInfo.password"
                type="password"
                autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="userInfo.gender"
                style="width: 100%;">
                <el-option value="男"></el-option>
                <el-option value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱"
              prop="email">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>

            <el-form-item label="确认密码"
              prop="checkPassword">
              <el-input v-model="userInfo.checkPassword"
                type="password"
                autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="生日">
              <el-date-picker type="date"
                placeholder="选择日期"
                v-model="userInfo.birthday"
                value-format="yyyy-MM-dd"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex"
          justify="center">
          <el-col :span="12">
            <el-button type="primary"
              style="width: 100%;"
              @click="register">保存信息</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
const qs = require('qs')
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (this.userInfo.checkPassword !== '') {
        this.$refs.userInfoFormRef.validateField('checkPassword')
      }
      callback()
    }
    let validatePass2 = (rule, value, callback) => {
      if (value !== this.userInfo.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let validateUserName = (rule, value, callback) => {
      this.$http
        .post('/user/validateUserName', qs.stringify({ userName: value }))
        .then(res => {
          if (res.data.code !== 10000) {
            callback(new Error(res.data.message))
          } else callback()
        })
    }
    let validateEmail = (rvarule, value, callback) => {
      this.$http
        .post('/user/validateEmail', qs.stringify({ email: value }))
        .then(res => {
          if (res.data.code !== 10000) {
            callback(new Error(res.data.message))
          } else callback()
        })
    }
    let validatePhone = (rule, value, callback) => {
      this.$http
        .post('/user/validatePhone', qs.stringify({ phoneNum: value }))
        .then(res => {
          if (res.data.code !== 10000) {
            callback(new Error(res.data.message))
          } else callback()
        })
    }
    return {
      registerDialog: false,
      userInfo: {
        userName: '',
        phoneNum: '',
        email: '',
        gender: '男',
        birthday: '',
        password: '',
        checkPassword: ''
      },
      userInfoFormRules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: validateUserName, trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' },
          {
            pattern: /^0{0,1}(13[0-9]|15[0-9]||16[0-9]|18[0-9]|19[0-9])[0-9]{8}$/,
            message: '手机号格式不对',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      loginForm: {
        accountName: 'juzi965@163.com',
        password: '123456'
      },
      loginFormRules: {
        accountName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      this.$refs.userInfoFormRef.validate((valid, errorObject) => {
        // 验证不通过不提交数据
        if (!valid) return
        // 请求登陆接口

        this.$http
          .post('/user/register', qs.stringify(this.userInfo))
          .then(res => {
            if (res.data.code == 10000) {
              this.registerDialog = false
              this.$message.success('注册成功')
            }
          })
      })
    },
    sublimtLogin() {
      this.$refs.loginFormRef.validate((valid, errorObject) => {
        // 验证不通过不提交数据
        if (!valid) return
        // 请求登陆接口
        this.$http
          .post('/user/login', qs.stringify(this.loginForm))
          .then(res => {
            if (res.data.code == 10000) {
              this.$message.success('欢迎回来')
              //保存用户信息
              this.$store.commit('setUserInfo', res.data.data)
              // 跳转到/index
              this.$router.push('/')
            }
          })
      })
    }
    // reset() {
    //   //重置表单
    //   this.$refs.loginFormRef.resetFields()
    // }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
}
.login_row {
  width: 100%;
  height: 100%;
  .avatar_box {
    text-align: center;
    padding-bottom: 20px;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
