<template>
  <div class="login">
    <div class="container">
      <img
        class="avatar"
        src="../assets/logo.png"
        alt=""
      >
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="userForm.username"
            placeholder="请输入用户名"
            prefix-icon="myicon myicon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="userForm.password"
            prefix-icon="myicon myicon-key"
            placeholder="请输入密码"
            type="password"
            @keydown.enter="submitForm('userForm')"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          @click="submitForm('userForm')"
        >登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
// 导入api接口请求模块
import { login } from '@/api/index.js'

export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (userForm) {
      // this.$refs[userForm].validate(valid=>{}) 获取表单中的数据,并做验证,返回 true 或 false
      this.$refs[userForm].validate(valid => {
        if (valid) {
          login(this.userForm).then(res => {
            // console.log(res)
            if (res.meta.status === 200) {
              // 登录成功后存储 token
              sessionStorage.setItem('userToken', res.data.token)
              // 登录成功后跳转到主页
              this.$router.push({ path: '/home' })
            } else {
              // 登录失败提示用户
              this.$message.error(res.meta.msg)
              return false
            }
          })
        } else {
          this.$message.error('错了哦，检查下是否输入有误啦...')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .demo-ruleForm {
      padding-top: 15px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
