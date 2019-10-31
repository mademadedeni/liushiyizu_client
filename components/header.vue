<template>
  <div>
    <header id="liuHeader" class="liu_header">
      <div class="content_box">
        <a class="p_ibt logo" :href="ctx"></a>
        <div class="p_ibt nav_box">
          <a :class="{on:defaultActive == 1}" class="p_ibt nav" :href="ctx">首页</a>
          <a
            v-if="user.user_permission == 1"
            :class="{on:defaultActive == 2}"
            class="p_ibt nav"
            :href="ctx+'/notes'"
          >笔记</a>
          <a :class="{on:defaultActive == 3}" class="p_ibt nav" :href="ctx+'/games'">游戏</a>
          <a :class="{on:defaultActive == 4}" class="p_ibt nav" :href="ctx+'/articles'">文章</a>
          <a :class="{on:defaultActive == 5}" class="p_ibt nav" :href="ctx+'/travels'">游记</a>
        </div>
        <div class="right">
          <div class="p_ibt search_box">
            <input
              v-model.trim="searchValue"
              class="input0"
              type="text"
              name="search"
              maxlength="30"
              placeholder="你想知道什么？"
            />
            <a class="iconfont icon-search" :href="searchUrl+searchValue" target="_blank"></a>
          </div>
          <div v-if="!_.isEmpty(user)" class="p_ibt liu_header_box">
            <div class="menu_box">
              <a class="p_ibt head" :href="ctx+'/user'">
                <img :src="res+user.avatar" :title="user.name" />
              </a>
              <div class="menu_conent">
                <div class="item_box">
                  <a class="p_ibt item" :href="ctx+'/user'">个人中心</a>
                  <a class="p_ibt item" :href="ctx+'/articles/write'">写好文章</a>
                </div>
                <div class="exit_box">
                  <a @click="onExit" class="p_ibt exit_btn" href="javascript:;">安全退出</a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="_.isEmpty(user)" class="p_ibt sign_box">
            <a @click="show('login')" class="sign_btn" href="javascript:;">登陆</a>
            <a @click="show('register')" class="sign_btn" href="javascript:;">注册</a>
          </div>
        </div>
      </div>
    </header>
    <Login ref="login" :visible.sync="isShow" />
  </div>
</template>

<script>
import Login from "./login.vue";
import { api } from "~/assets/js/common/axios.js";
import _ from "lodash";

import Vue from "vue";
import { error } from "util";

export default {
  name: "liuHeader",
  props: {
    defaultActive: [String, Number],
    userData: ""
  },
  components: {
    Login
  },
  data: function() {
    return {
      searchValue: "", //搜索内容
      searchUrl: "/search?value=",
      user: {},
      isShow: ""
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.init();
    });
  },
  methods: {
    init: function() {
      var _this = this;
      api
        .get("/user/userInfo", { withCredentials: true })
        .then(function(res) {
          if (res.data.success) {
            _this.user = res.data.data;
          }
          if (!_.isEmpty(_this.user)) {
            _this.$emit("get-user", _this.user);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    onSearchBtn: function() {},
    /**
     * type:string ['login','register']
     **/
    show(type) {
      this.isShow = type;
    },
    onExit: function() {
      var that = this;
      api
        .post("/user/exit")
        .then(function(res) {
          if (res.data.message == "success") {
            sessionStorage.removeItem("userData");
            window.location.reload();
          } else {
            that.$message.error("退出失败！");
          }
        })
        .catch(function(error) {
          that.$message.error("退出失败！");
        });
    }
  }
};
</script>

<style lang="scss">
.liu_header {
  min-width: 1200px;
}
.liu_header .content_box {
  height: 40px;
  min-width: 1200px;
  background-color: #f3f3f3;
  padding: 10px 0;
  box-shadow: 0px 0px 6px 0px rgba(3, 3, 3, 0.3);
}
.liu_header .content_box .logo {
  height: 40px;
  width: 143px;
  background: url("~assets/images/logo/liushiyizu.png");
  background-size: auto 40px;
  margin-left: 20px;
}
.liu_header .content_box .nav_box {
  height: 40px;
  margin-left: 80px;
}
.liu_header .content_box .nav_box .nav {
  line-height: 40px;
  color: #333;
  font-size: 16px;
  padding: 0px 5px;
  position: relative;
  margin: 0px 10px;
}
.liu_header .content_box .nav_box .nav:hover:after,
.liu_header .content_box .nav_box .nav.on:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  height: 3px;
  background-color: #09f;
  width: 100%;
}
.liu_header .content_box .search_box {
  position: relative;
  margin-right: 20px;
}
.liu_header .content_box .search_box .input0 {
  border: none;
  height: 40px;
  padding-right: 30px;
  width: 250px;
  padding-left: 10px;
}
.liu_header .content_box .search_box .icon-search {
  position: absolute;
  right: 10px;
  top: 13px;
  cursor: pointer;
}
.liu_header_box {
  margin-right: 20px;
  position: relative;
  height: 40px;
  width: 40px;
}
.liu_header_box .head {
  position: relative;
  z-index: 3;
  width: 40px;
  height: 40px;
}
.liu_header_box .head img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.liu_header_box .menu_box {
  position: absolute;
  z-index: 2;
  right: 0;
  width: 40px;
  top: 0px;
  height: 40px;
}
.liu_header_box .menu_box:hover {
  height: 60px;
  padding-left: 90px;
}
.liu_header_box .menu_box:hover .menu_conent {
  visibility: visible;
}
.liu_header_box .menu_box .menu_conent {
  position: absolute;
  z-index: 2;
  background-color: #fff;
  width: 200px;
  border-radius: 5px;
  right: 0px;
  top: 50px;
  box-shadow: 0px 0px 6px 0px rgba(9, 9, 9, 0.3);
  visibility: hidden;
}
.liu_header_box .menu_box .menu_conent .item_box {
  padding: 15px 10px;
  text-align: center;
}
.liu_header_box .menu_box .menu_conent .item {
  line-height: 30px;
  width: 80px;
  border-radius: 3px;
}
.liu_header_box .menu_box .menu_conent .item:hover {
  color: #09f;
  background-color: #f5f7fa;
}
.liu_header_box .menu_box .menu_conent .exit_box {
  text-align: center;
  border-top: 1px solid #ccc;
}
.liu_header_box .menu_box .menu_conent .exit_box .exit_btn {
  padding: 10px 0;
}
.liu_header .content_box .sign_box {
  font-size: 16px;
  margin-right: 20px;
  margin-top: 8px;
}
.liu_header .content_box .sign_box .sign_btn {
  padding: 0px 10px;
}
.liu_header .content_box .sign_box .sign_btn:hover {
  color: #09f;
}
</style>
