<template>
  <div class="_nuxt">
    <nuxt />
  </div>
</template>

<script>
import common from "~/assets/js/common";
export default {
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {}
};
</script>

<style>
._nuxt {
  min-height: 100vh;
}
</style>
