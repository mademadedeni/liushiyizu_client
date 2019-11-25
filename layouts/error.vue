<template>
  <div class="container" :class="[error.statusCode === 404?'bg_404':'bg_500']">
    <div v-if="error.statusCode === 404">
      <div class="p_ibt callback">
        <el-button type="primary">
          <nuxt-link to="/">返回首页</nuxt-link>
        </el-button>
      </div>
    </div>
    <div v-else>
      <h1>应用发生错误异常</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>

<style lang="scss" scope>
.container {
  color: #333;
  text-align: center;
  height: 100vh;

  .callback {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: 200px;
  }
}
.bg_404 {
  background: url("~assets/images/404.jpg");
  background-size: cover;
}
.bg_500 {
  background: url("~assets/images/500.jpg");
  background-size: cover;
}
</style>
