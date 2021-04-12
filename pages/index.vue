<template>
  <div>
    <Header default-active="1" />
    <Main>
      <div class="auto_box">
        <!-- banner -->
        <div class="carousel_banner Mtp30">
          <el-carousel
            class
            trigger="click"
            height="500px"
          >
            <el-carousel-item
              v-for="(article,index) in banner"
              :key="article.id"
            >
              <a
                class="link"
                :href="ctx+'/articles/'+article.id"
                target="_blank"
              >
                <img
                  v-if="index%2==0"
                  src="~assets/images/index/hai_zei_wang.jpg"
                  :alt="article.title"
                />
                <img
                  v-else
                  src="~assets/images/index/tian_xing_jiu_ge.jpg"
                  :alt="article.title"
                />
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- articles -->
        <div class="article_list Ptp60">
          <div
            v-for="article in articles"
            class="p_ibt item_box"
            :key="article.id"
          >
            <a
              :href="ctx+'/articles/'+article.id"
              target="_blank"
            >
              <h3 class="h3">{{article.title}}</h3>
              <div
                class="content"
                v-html="article.content"
              ></div>
              <div class="option_box">
                <span>作者：</span>
                <span class="Mrt20 p_ibt WTO max_wid70">{{article.name}}</span>
                <span>时间：</span>
                <span>{{dateFormat(article.updateDate)}}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Main>
    <Footer />
  </div>
</template>

<script>
import Main from "~/components/main.vue";
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";
import utils from "~/assets/js/utils.js";

export default {
  components: {
    Header,
    Main,
    Footer,
  },
  data: function () {
    return {
      articles: [],
      banner: [],
    };
  },
  asyncData({ $axios }) {
    return $axios
      .get("/api/articles", {
        params: { pageNum: 1, pageSize: 8 },
      })
      .then((res) => {
        if (res.data.success) {
          var banner = [];
          var articles = res.data.data;
          banner.push(articles[0]);
          banner.push(articles[1]);
          return { articles: articles, banner: banner };
        }
        return {};
      });
  },
  head() {
    return {
      title: "刘氏一族",
    };
  },
  methods: {
    dateFormat: function (dateTime) {
      return utils.dateFormat({ dateTime: dateTime });
    },
  },
};
</script>

<style lang="scss">
.carousel_banner {
  box-shadow: 0 15px 21px -10px rgba(7, 17, 27, 0.2);
  border-radius: 10px;
  background-color: #f2f2f2;

  .el-icon-arrow-left,
  .el-icon-arrow-right {
    font-size: 16px;
  }
  .el-carousel__arrow {
    background-color: rgba(31, 45, 61, 0.3);
  }

  .el-carousel__item {
    .link {
      display: block;
      height: 100%;

      img {
        width: 100%;
      }
    }
  }
}
</style>
