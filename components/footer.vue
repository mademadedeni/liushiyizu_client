<template>
  <footer id="liuFooter" class="liu_footer">
    <span>Copyright© 2017-2020 中国北京昌平区燕丹乡刘氏一族</span>
  </footer>
</template>

<script>
export default {
  name: "liuFooter",
  props: ["page", "status"],
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {
    userExit: function() {}
  }
};
</script>

<style lang="scss">
.liu_footer {
  height: 40px;
  background-color: #242424;
  margin: 0 auto;
  font-size: 12px;
  color: #ccc;
  text-align: center;
  padding-top: 20px;
  line-height: 20px;
}
</style>
