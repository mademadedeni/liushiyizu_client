<template>
  <div>
    <LiuHeader @get-user="getUser" default-active="4"></LiuHeader>
    <LiuMain>
      <div class="auto_box wid900">
        <div class="Ptp30">
          <h1 class="p_ibt co_333">{{article.title}}</h1>
          <div class="article_author">
            <img class="img" :src="res+article.avatar" />
            <div class="p_ibt Mlf20">
              <span class="p_ibt Mtp10">{{article.nickname}}</span>
              <div class="signature">{{article.signature}}</div>
            </div>
            <div class="date_box">
              <span>创建时间：</span>
              <span>{{dateFormat(article.createDate)}}</span>
              <span class="Mlf20">修改时间：</span>
              <span>{{dateFormat(article.updateDate)}}</span>
              <a
                v-if="isCreator"
                class="Mlf20"
                :href="'/articles/write/'+article.id"
                target="_blank"
              >编辑</a>
            </div>
          </div>
        </div>
        <div class="Pbm60">
          <div
            class="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred"
            v-html="article.content"
          ></div>
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
import "~/assets/css/ckeditor.css";
import "~/assets/css/ckeditor.scss";

export default {
  components: {
    LiuHeader,
    LiuMain,
    LiuFooter
  },
  data() {
    return {
      user: {},
      article: {}
    };
  },
  asyncData({ params }) {
    return api
      .get("/articles/" + params.id)
      .then(res => {
        res.data.data.content = utils.replaceHost(res.data.data.content);
        return { article: res.data.data };
      })
      .catch(err => {
        return {};
      });
  },
  head() {
    return {
      title: this.article.title + this.title
    };
  },
    validate({ params }) {
      // 必须是number类型
      return (params.id+"").length == 32;
    },
  mounted: function() {
    this.$nextTick(function() {
      // this.init();
    });
  },
  computed: {
    isCreator: function() {
      return this.article.userId == this.user.id;
    }
  },
  methods: {
    init: function() {
      var that = this;
      //获取文章内容
      if (article_id) {
        api.get("/articles/" + article_id).then(function(res) {
          if (res.data.message == "success") {
            that.article = res.data.data;
          }
        });
      }
    },
    dateFormat: function(date) {
      return utils.dateFormat({ dateTime: date });
    },
    getUser: function(user) {
      this.user = user;
    }
  }
};
</script>
