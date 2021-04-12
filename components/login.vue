<template>
  <div v-show="isShow!==''" class="liu_float_panel" style="display:none;">
    <div v-show="isShow == 'login'" class="p_ibm liu_login">
      <div class="title_box">
        <span class="title">登录</span>
        <a @click="onClose" class="el-icon-close F20 right" href="javascript:;"></a>
      </div>
      <div class="content_box">
        <div class="value_box">
          <el-input
            @keyup.enter.native="onLogin"
            maxlength="16"
            v-model="name"
            name="userName"
            placeholder="请输入用户名"
          ></el-input>
        </div>
        <div class="value_box">
          <el-input
            @keyup.enter.native="onLogin"
            maxlength="16"
            v-model="password"
            placeholder="请输入用户名"
            type="password"
            name="password"
          ></el-input>
        </div>
        <div class="option_box">
          <el-checkbox v-model="autoLogin">七天自动登录</el-checkbox>
          <!-- <a class="right" href="javascript:;">忘记密码</a> -->
        </div>
        <div class="login_box">
          <a
            @click="onLogin"
            :class="{'button_disable':isLogin}"
            class="button0"
            href="javascript:;"
          >{{isLogin ? '登录中' : '登 录'}}</a>
        </div>
        <div class="Tright to_login">
          <span>没有账号，</span>
          <a class="co_09f" @click="isShow='register'" href="javascript:;">去注册？</a>
        </div>
      </div>
    </div>
    <div v-show="isShow == 'register'" class="p_ibm liu_login">
      <div class="title_box">
        <span class="title">注册</span>
        <a @click="onClose" class="el-icon-close right F20" href="javascript:;"></a>
      </div>
      <div class="content_box">
        <div class="value_box">
          <input
            @keyup.enter.native="onSignIn"
            v-model.trim="signInName"
            class="input0"
            type="text"
            name="username"
            placeholder="用户名"
            maxlength="16"
          />
        </div>
        <div class="value_box">
          <input
            @keyup.enter.native="onSignIn"
            v-model.trim="signInPwd"
            class="input0"
            type="password"
            name="password"
            placeholder="密码"
            maxlength="16"
          />
        </div>
        <div class="option_box">
          <input
            @keyup.enter.native="onSignIn"
            v-model.trim="captcha"
            class="input0"
            type="text"
            name="captcha"
            placeholder="验证码"
            maxlength="8"
          />
          <div @click="getCaptcha" class="p_ibt" v-html="captchaHtml" title="区分大小写"></div>
        </div>
        <div class="login_box">
          <a
            @click="onSignIn"
            :class="{'button_disable':isSignIn}"
            class="button0"
            href="javascript:;"
          >{{isSignIn ? '注册中' : '注 册'}}</a>
        </div>
        <div class="Tright to_login">
          <span>已有账号，</span>
          <a class="co_09f" @click="isShow='login'" href="javascript:;">去登录？</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "~/assets/js/common/axios.js";

export default {
  name: "liuLogin",
  props: {
    visible: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      name: "",
      password: "",
      autoLogin: false,
      signInName: "",
      signInPwd: "",
      isLogin: false,
      isSignIn: false,
      captcha: "",
      captchaHtml: "",
      isShow: ""
    };
  },
  mounted: function() {
    this.init();
  },
  watch: {
    visible: function(val) {
      this.isShow = val;
    },
    isShow: function(val) {
      if (val == "register") {
        this.getCaptcha();
      }
    }
  },
  methods: {
    init: function() {
      var that = this;
    },
    onLogin: function() {
      var that = this;
      if (!that.isLogin) {
        that.isLogin = true;
      }
      var param = {
        name: that.name,
        password: that.password,
        autoLogin: that.autoLogin
      };

      if (!param.name || param.name.split(" ").length > 1) {
        that.$message.error("用户名不合法");
        that.isLogin = false;
        return;
      }
      if (
        !param.password ||
        param.password.split(" ").length > 1 ||
        param.password.length < 6
      ) {
        that.$message.error("密码不合法");
        that.isLogin = false;
        return;
      }
      api
        .post("/user/login", param)
        .then(function(res) {
          if (res.data.success) {
            window.location.reload();
          } else {
            that.$message.error("用户名或密码错误");
          }
          that.isLogin = false;
        })
        .catch(function(error) {
          //   window.location.reload();
        });
    },
    onClose: function() {
      this.isShow = 0;
      this.$emit("update:visible", "");
    },
    //注册
    onSignIn: function() {
      var that = this;
      if (!that.isSignIn) {
        that.isSignIn = true;
      }
      var param = {
        name: that.signInName,
        password: that.signInPwd,
        captcha: that.captcha
      };

      if (!param.name) {
        that.$message.error("用户名不能为空！");
        that.isSignIn = false;
        return;
      } else if (param.name.split(" ").length > 1) {
        that.$message.error("用户名不合法！");
        that.isSignIn = false;
        return;
      }
      if (!param.password) {
        that.$message.error("密码不能为空！");
        that.isSignIn = false;
        return;
      } else if (
        param.password.split(" ").length > 1 ||
        param.password.length < 6
      ) {
        that.$message.error("密码不合法！");
        that.isSignIn = false;
        return;
      }
      if (!param.captcha) {
        that.$message.error("验证码不能为空！");
        that.isSignIn = false;
        return;
      } else if (
        param.captcha.split(" ").length > 1 ||
        param.captcha.length < 4
      ) {
        that.$message.error("验证码不正确！");
        that.isSignIn = false;
        that.getCaptcha();
        return;
      }
      this.$axios
        .post("/user/signin", param)
        .then(function(res) {
          if (res.data.success) {
            that.$alert("恭喜你注册成功，快去登录吧！", "提示", {
              confirmButtonText: "好的",
              callback: function(action) {
                window.location.reload();
              }
            });
          } else {
            that.$message.error(res.data.message);
            that.getCaptcha();
          }
          that.isSignIn = false;
        })
        .catch(function(error) {
          that.isSignIn = false;
          console.log(error);
        });
    },
    getCaptcha: function() {
      this.$axios.get("/api/user/captcha").then((res) =>{
        this.captchaHtml = res.data;
      });
    }
  }
};
</script>

<style lang="scss">
.liu_login {
  min-width: 320px;
  min-height: 300px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(9, 9, 9, 0.5);
  text-align: left;
  padding: 10px 20px;
  position: relative;
}
.liu_login .title_box .title {
  font-size: 16px;
  color: #333;
}
.liu_login .icon-close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 24px;
}
.liu_login .content_box .value_box {
  margin-top: 20px;
}
.liu_login .content_box .value_box .input0 {
  height: 40px;
  width: 100%;
  text-indent: 10px;
}
.liu_login .content_box .option_box {
  margin-top: 20px;
  color: #999;
  font-size: 12px;
}
.liu_login .content_box .option_box .input0 {
  height: 40px;
  text-indent: 10px;
}
.liu_login .content_box .login_box {
  margin-top: 20px;
}
.liu_login .content_box .login_box .button0 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.liu_login .content_box .option_box .icon-checkbox_fill {
  color: #09f;
}
.liu_login .content_box .option_box .captcha {
  height: 40px;
}
.liu_login .content_box .to_login {
  color: #999;
  font-size: 12px;
  margin-top: 10px;
}
</style>
