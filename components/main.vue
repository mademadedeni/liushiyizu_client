<template>
  <main id="liuMain" class="liu_main" :style="style">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: "liuMain",
  props: {
    width: {
      type: String
    },
    height: {
      type: String
    }
  },
  data: function() {
    return {};
  },
  computed: {
    style: function() {
      var style = {};
      if (this.width) {
        style.width = this.width;
      }
      if (this.height) {
        style.height = this.height;
      }
      return style;
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      var liuFooter = document.getElementById("liuFooter");
      var headerHeight = document.getElementById("liuHeader").clientHeight;
      var footerHeight = liuFooter ? liuFooter.clientHeight : 0;
      this.$el.style.minHeight =
        window.innerHeight - headerHeight - footerHeight + "px";
    });
  },
  methods: {}
};
</script>

<style lang="scss">
.liu_main {
  min-height: calc(100vh - 60px - 60px);
}
</style>
