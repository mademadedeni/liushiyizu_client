<template>
  <div class="liu_user_header">
    <div class="auto_box">
      <div class="p_ibt head_box">
        <img class="img" :src="res+user.avatar" />
        <!-- <a @click="uploadHeadbtn" class="set_head" href="javascript:;">更换头像</a> -->
      </div>
      <div class="p_ibt info_box">
        <div class="name">{{user.nickname}}</div>
        <div class="glory">
          <span>性别：</span>
          <span>{{userSex[user.sex]}}</span>
          <span class="Mlf5">年龄：</span>
          <span>{{user.age}}</span>
          <span class="Mlf5">地址：</span>
          <span>{{user.address}}</span>
        </div>
        <div class="signature">{{user.signature}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "~/assets/js/utils.js";

export default {
  name: "LiuUserHeader",
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  data: function() {
    return {
      userSex: utils.userSex
    };
  },
  mounted: function() {
    this.$nextTick(function() {});
  },
  methods: {
    init: function() {
      var that = this;
    }
  }
};
</script>

<style lang="scss">
.liu_user_header {
  height: 220px;
  background: url("~assets/images/article/temp1.jpg") no-repeat center;
  background-size: cover;
}
.liu_user_header .auto_box {
  padding-top: 15px;
}
.liu_user_header .head_box {
  position: relative;
  width: 188px;
  height: 188px;
  border-radius: 50%;
  overflow: hidden;
}
.liu_user_header .head_box .set_head {
  position: absolute;
  bottom: -40px;
  width: 100%;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  text-align: center;
  color: #fff;
  line-height: 40px;
  -webkit-transition: bottom 0.3s ease;
  -moz-transition: bottom 0.3s ease;
  -ms-transition: bottom 0.3s ease;
  -o-transition: bottom 0.3s ease;
  transition: bottom 0.3s ease;
}
.liu_user_header .head_box:hover .set_head {
  bottom: 0;
}
.liu_user_header .head_box .img {
  width: 180px;
  height: 180px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
}
.liu_user_header .info_box {
  margin-left: 40px;
  color: #fff;
  margin-top: 30px;
  width: 800px;
}
.liu_user_header .info_box .name {
  font-size: 32px;
}
.liu_user_header .info_box .glory {
  font-size: 14px;
  margin-top: 10px;
}
.liu_user_header .info_box .signature {
  font-size: 14px;
  opacity: 0.5;
  margin-top: 20px;
  height: 38px;
  overflow: hidden;
}
</style>
