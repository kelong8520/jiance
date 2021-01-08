<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form">
      <div class="title-container">
        <h3 class="title">韶关检测系统</h3>
      </div>
      <div class="input1">
        <el-input v-model="loginForm.userName" placeholder="username" name="userName" type="text" />
      </div>
      <div class="input1">
        <el-input
          v-model="loginForm.psw"
          placeholder="password"
          name="password"
          show-password
          @keyup.enter.native="handleLogin"
        />
      </div>
      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
        class="button1"
      >Login</el-button>
    </el-form>
  </div>
</template>

<script>
import * as loginApi from "@/api/loginApi.js";
import querystring from "querystring";

export default {
  name: "login",
  data() {
    return {
      loginForm: {},
      loading: false,
    };
  },
  methods: {
    handleLogin() {
      let _data = this.loginForm;
      loginApi
        .login(querystring.stringify(_data))
        .then(res => {
          if(res.data == true){
            this.$router.replace('/index')
            this.loading = false
            this.loginForm = {};
          }else{
            this.$message(res.msg,2000)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 200px;
}
.login-form {
  width: 500px;
  margin: auto;
  border: 1px solid rgba(233, 233, 233, 0.9);
  background: rgba(233, 233, 233, 0.9);
}
.title-container {
  margin-top: 20px;
}
.title {
  font-size: 30px;
}
.el-input {
  width: 250px;
  margin-top: 30px;
}
.button1 {
  width: 200px;
  margin: 40px 0;
}
</style>
