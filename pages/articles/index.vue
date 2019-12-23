<template>
  <div>
    <LiuHeader @get-user="getUser" default-active="4"></LiuHeader>
    <LiuMain>
      <div class="auto_box">
        <div class="Ptp30">
          <h2 class="p_ibt">最新文章</h2>
          <a class="right" :href="ctx+'/articles/write'" target="_blank">我也写一篇</a>
        </div>
        <div class="Ptp20">
          <div v-for="article in articles" class="article_list_box" :key="article.id">
            <div class="title_box">
              <a :href="ctx+'/articles/'+article.id" class="title" target="_blank">
                <h3 class="p_ibt">{{article.title}}</h3>
              </a>
              <div v-if="article.user.id == user.id || user.permission == 1" class="right">
                <a @click="delArticle(article.id,article.user.id)" href="javascript:;">删除</a>
                <a class="Mlf20" :href="ctx+'/articles/write/'+article.id" target="_blank">编辑</a>
              </div>
            </div>
            <div class="head_box Mtp10">
              <img class="img" :src="res+article.user.avatar" />
              <span class="p_ibt Mtp10 Mlf20">{{article.user.nickname}}</span>
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
    </LiuMain>
    <LiuFooter></LiuFooter>
  </div>
</template>

<script>
import LiuMain from "~/components/main.vue";
import LiuHeader from "~/components/header.vue";
import LiuFooter from "~/components/footer.vue";
import { api } from "~/assets/js/common/axios.js";
import utils from "~/assets/js/utils.js";

export default {
  components: {
    LiuHeader,
    LiuMain,
    LiuFooter
  },
  data() {
    return {
      articles: [],
      showLogin: 0,
      showUploadHead: true,
      user: {},
      totalCount: 0,
      pageNum: 1,
      pageSize: 10
    };
  },
  asyncData({ params }) {
    return api
      .get("/articles", {
        params: {
          pageNum: 1,
          pageSize: 10
        }
      })
      .then(res => {
        return {
          articles: res.data.data,
          totalCount: res.data.totalCount
        };
      });
  },
  head() {
    return {
      title: "文章" + this.title
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.init();
    });
  },
  methods: {
    init: function() {
      //   this.getArticles();
    },
    toLogin: function(i) {
      this.showLogin = i;
    },
    closeLogin: function() {
      this.showLogin = 0;
    },
    getArticles: function() {
      var that = this;
      api
        .get("/articles", {
          params: {
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            orderBy: "article_edit_date"
          }
        })
        .then(function(res) {
          if (res.data.success) {
            that.articles = res.data.data;
            that.totalCount = res.data.totalCount;
          }
        });
    },
    getUser: function(user) {
      this.user = user;
    },
    dateFormat: function(date) {
      return utils.dateFormat({dateTime:date});
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
        .then(function() {
          api
            .get("/articles/delete/" + articles_id + "?token=1")
            .then(function(res) {
              if (res.data.message == "success") {
                that.$message.success("删除成功！");
                that.getArticles();
              } else {
                that.$message.success("删除失败！");
              }
            })
            .catch(function(err) {
              that.$message.success(err);
            });
        })
        .catch(function() {});
    },
    handleCurrentChange: function(val) {
      this.pageNum = val;
      this.getArticles();
    }
  }
};
</script>
