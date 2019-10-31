<template>
  <div>
    <Header default-active="2" />
    <Main>
      <div class="auto_box">
        <a :href="ctx+'/games/1'">贪吃蛇</a>
      </div>
    </Main>
    <Footer />
  </div>
</template>

<script>
import Main from "~/components/main.vue";
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";
import { api } from "~/assets/js/common/axios.js";

export default {
  components: {
    Header,
    Main,
    Footer
  },
  asyncData({ params }) {
    return {}
  },
  head() {
    return {
      title: "游戏"
    };
  },
  methods: {

  }
};
</script>

<style lang="scss">

</style>
