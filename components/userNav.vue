<template>
  <div class="liu_user_nav">
    <a class="option" :href="ctx+'/user'" :class="{'active':active=='userInfo'}">
      <span class="iconfont icon-user"></span>
      <span>个人信息</span>
    </a>
    <a class="option" :href="ctx+'/user/articles'" :class="{'active':active=='article'}">
      <span></span>
      <span>文章</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "LiuUserNav",
  props: {
    active: {
      type: String,
      default: "userInfo"
    }
  },
  data: function() {
    return {};
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
.liu_user_nav {
  margin-top: 30px;
  display: inline-block;
  vertical-align: top;
  width: 160px;
}
.liu_user_nav .option {
  position: relative;
  display: block;
  height: 48px;
  font-size: 16px;
  line-height: 48px;
  color: #666;
  padding-left: 64px;
  text-align: left;
  margin-bottom: 10px;
  position: relative;
}
.liu_user_nav .option:hover {
  color: #333;
}
.liu_user_nav .option .icon-user {
  font-size: 24px;
  position: absolute;
  left: 20px;
}
.liu_user_nav .option.active {
  color: #fff;
  background: rgba(240, 20, 20, 0.8);
  border-radius: 8px 0 0 8px;
}
.liu_user_nav .option.active:after {
  display: block;
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 24px solid #fff;
  border-bottom: 24px solid #fff;
  border-left: 15px solid transparent;
}
</style>
