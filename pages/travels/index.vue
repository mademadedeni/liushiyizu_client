<template>
  <div>
    <LiuHeader
      @get-user="getUser"
      default-active="5"
    ></LiuHeader>
    <LiuMain>
      <div class="auto_box">
        <div class="Ptp30">
          <h2 class="p_ibt">最新文章</h2>
          <a
            class="right"
            :href="ctx+'/articles/write'"
            target="_blank"
          >我也写一篇</a>
        </div>
        <div class="Ptp20">
          <div
            v-for="article in articles"
            class="article_list_box"
            :key="article.article_id"
          >
            <div class="title_box">
              <a
                :href="ctx+'/articles/'+article.article_id"
                class="title"
                target="_blank"
              >
                <h3 class="p_ibt">{{article.article_title}}</h3>
              </a>
              <div
                v-if="article.user_id == user.user_id || user.user_permission == 1"
                class="right"
              >
                <a
                  @click="delArticle(article.article_id,article.user_id)"
                  href="javascript:;"
                >删除</a>
                <a
                  class="Mlf20"
                  :href="ctx+'/articles/write/'+article.article_id"
                  target="_blank"
                >编辑</a>
              </div>
            </div>
            <div class="head_box Mtp10">
              <img
                class="img"
                :src="res+article.user_head_img"
              />
              <span class="p_ibt Mtp10 Mlf20">{{article.user_nickname}}</span>
            </div>
            <div
              class="content"
              v-html="article.article_content"
            ></div>
            <div class="date_box">
              <span>创建时间：</span>
              <span>{{dateFormat(article.article_create_date)}}</span>
              <span class="Mlf20">修改时间：</span>
              <span>{{dateFormat(article.article_edit_date)}}</span>
            </div>
          </div>
          <div
            v-show="totalCount>pageSize"
            class="Ptp20 Center Pbm20"
          >
            <el-pagination
              class="el_pagination"
              background
              @current-change="handleCurrentChange"
              layout="total,prev, pager, next"
              :page-size="pageSize"
              :total="totalCount"
            ></el-pagination>
          </div>
        </div>
      </div>
    </LiuMain>
    <LiuFooter></LiuFooter>
  </div>
</template>

<script>
import LiuMain from "~/components/main.vue";
import LiuHeader from "~/components/header.vue";
import LiuFooter from "~/components/footer.vue";
import utils from "~/assets/js/utils.js";

export default {
  components: {
    LiuHeader,
    LiuMain,
    LiuFooter,
  },
  data() {
    return {
      articles: [],
      showLogin: 0,
      showUploadHead: true,
      user: {},
      totalCount: 0,
      pageNum: 1,
      pageSize: 10,
    };
  },
  asyncData({ $axios }) {
    return $axios
      .get("/api/articles", {
        params: {
          pageNum: 1,
          pageSize: 10,
          orderBy: "article_edit_date",
        },
      })
      .then((res) => {
        return {
          articles: res.data.data.articles,
          totalCount: res.data.data.totalCount,
        };
      });
  },
  head() {
    return {
      title: "文章" + this.title,
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      this.init();
    });
  },
  methods: {
    init: function () {
      //   this.getArticles();
    },
    toLogin: function (i) {
      this.showLogin = i;
    },
    closeLogin: function () {
      this.showLogin = 0;
    },
    getArticles: function () {
      this.$axios
        .get("/api/articles", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            orderBy: "article_edit_date",
          },
        })
        .then((res) => {
          if (res.data.message == "success") {
            this.articles = res.data.data.articles;
            this.totalCount = res.data.data.totalCount;
          }
        });
    },
    getUser: function (user) {
      this.user = user;
    },
    dateFormat: function (date) {
      return utils.dateFormat(date);
    },
    delArticle: function (articles_id, user_id) {
      if (!this.user.user_id) {
        this.showLogin = 1;
        return;
      }
      if (this.user.user_id != user_id && this.user.user_id != 1) {
        this.$message.error("只能删除自己的文章！");
        return false;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .get("/api/articles/delete/" + articles_id + "?token=1")
            .then((res) => {
              if (res.data.message == "success") {
                this.$message.success("删除成功！");
                this.getArticles();
              } else {
                this.$message.success("删除失败！");
              }
            })
            .catch((err) => {
              this.$message.success(err);
            });
        })
        .catch(function () {});
    },
    handleCurrentChange: function (val) {
      this.pageNum = val;
      this.getArticles();
    },
  },
};
</script>
