<template>
  <div id="app">
    <liu-header @get-user="getUser" :tab-id="0"></liu-header>
    <liu-main>
      <!-- top -->
      <liu-user-header :user="user"></liu-user-header>
      <!-- content -->
      <div class="auto_box user_main_box">
        <liu-user-nav active="article"></liu-user-nav>
        <div class="p_ibt user_content_box">
          <div class="user_content_title">
            <span class="title">我的文章</span>
            <div class="right">
              <a class="iconfont icon-edit" :href="ctx+'/articles/write'">写文章</a>
            </div>
          </div>
          <div class="user_base_box">
            <div v-for="article in articles" class="article_list_box" :key="article.id">
              <div class="head_box">
                <img class="img" :src="res+article.avatar" />
                <span class="p_ibt Mtp10 Mlf20">{{article.nickname}}</span>
              </div>
              <div class="title_box">
                <a
                  :href="ctx+'/articles/'+article.id"
                  class="title"
                >{{article.title}}</a>
                <div
                  v-if="article.id == user.id || user.permission == 1"
                  class="right"
                >
                  <a @click="delArticle(article.id,article.id)" href="javascript:;">删除</a>
                  <a
                    class="Mlf20"
                    :href="ctx+'/article/editor/'+article.id"
                    target="_blank"
                  >编辑</a>
                </div>
              </div>
              <div class="content" v-html="article.content"></div>
              <div class="date_box">
                <span>创建时间：</span>
                <span>{{dateFormat(article.createDate)}}</span>
                <span class="Mlf20">修改时间：</span>
                <span>{{dateFormat(article.updateDate)}}</span>
              </div>
            </div>
            <div v-show="totalCount>pageSize" class="Ptp20 Center Pbm20">
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
      </div>
    </liu-main>
    <liu-footer></liu-footer>
  </div>
</template>

<script>
import LiuMain from "~/components/main.vue";
import LiuHeader from "~/components/header.vue";
import LiuFooter from "~/components/footer.vue";
import LiuUserHeader from "~/components/userHeader.vue";
import LiuUserNav from "~/components/userNav.vue";
import { api } from "~/assets/js/common/axios.js";
import utils from "~/assets/js/utils.js";

export default {
  components: {
    LiuHeader,
    LiuMain,
    LiuFooter,
    LiuUserHeader,
    LiuUserNav
  },
  data() {
    return {
      user: {},
      articles: [],
      totalCount: 0,
      pageSize: 20,
      pageNum: 1
    };
  },
  mounted: function() {
    this.$nextTick(function() {});
  },
  methods: {
    dateFormat: function(date) {
      return utils.dateFormat({
          dateTime:date
      });
    },
    initArticles: function() {
      var that = this;
      var articleData = document.getElementById("articles")
        ? document.getElementById("articles").text
        : null;
      var data = articleData ? JSON.parse(articleData) : {};
      if (data.articles) {
        this.articles = data.articles;
        this.totalCount = data.totalCount;
        return;
      }
      this.getArticles();
    },
    getArticles: function() {
      var that = this;
      api
        .get("/users/"+that.user.id+"/articles", {
          params: {
            pageNum: that.pageNum,
            pageSize: that.pageSize
          }
        })
        .then(function(res) {
          if (res.data.success) {
            that.articles = res.data.data;
            that.totalCount = res.data.totalCount;
          }
        });
    },
    delArticle: function(articles_id, user_id) {
      var that = this;
      if (!that.user.id) {
        that.showLogin = 1;
        return;
      }
      if (that.user.id != user_id && that.user.id != 1) {
        that.$message.error("只能删除自己的文章！");
        return false;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .get("/articles/delete/" + articles_id + "?token=1")
            .then(function(res) {
              if (res.data.message == "success") {
                that.$message.success("删除成功！");
                that.initArticles();
              } else {
                that.$message.success("删除失败！");
              }
            })
            .catch(function(err) {
              that.$message.success(err);
            });
        })
        .catch(() => {});
    },
    getUser: function(user) {
      this.user = user;
      this.initArticles();
    },
    handleCurrentChange: function(val) {
      this.pageNum = val;
      this.getArticles();
    }
  }
};
</script>
