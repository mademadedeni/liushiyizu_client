<template>
  <div>
    <!-- header -->
    <LiuHeader
      :tab-id="4"
      @get-user="getUser"
    ></LiuHeader>
    <LiuMain>
      <div
        class="auto_box Ptp60"
        style="width:900px;"
      >
        <div>
          <el-input
            placeholder="请输入标题（最多100个字）"
            v-model="article.title"
            :maxlength="100"
            :minlength="3"
            clearable
          ></el-input>
        </div>
        <div class="Ptp30">
          <div ref="toolbar"></div>
          <div class="Mtp30 posr">
            <no-ssr>
              <ckeditor
                :editor="CKEDITOR"
                v-model="article.content"
                :config="editorConfig"
                @ready="onReady"
              ></ckeditor>
            </no-ssr>
          </div>
        </div>
        <div class="Ptp30 Tright">
          <el-button
            @click="onCommit"
            type="primary"
            round
            size="medium"
          >提 交</el-button>
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
import uploadAdapter from "~/plugins/uploadAdapter.js";
import "~/assets/css/ckeditor.scss";

let ckeditorDocument;
if (process.browser) {
  ckeditorDocument = require("@ckeditor/ckeditor5-build-decoupled-document");
}

export default {
  components: {
    LiuHeader,
    LiuMain,
    LiuFooter,
  },
  head() {
    return {
      title: "写文章" + this.title,
    };
  },
  data() {
    return {
      article: {},
      showUploadHead: true,
      user: {},
      editor: {},
      CKEDITOR: ckeditorDocument,
      editorConfig: utils.getEditorConfig({
        placeholder: '请输入正文',
        extraPlugins: [uploadAdapter("/editor/upload?action=uploadimage")],
      }),
    };
  },
  asyncData: function ({ params, $axios }) {
    return $axios.get("/api/articles/" + params.id).then((res) => {
      res.data.data.content = utils.replaceHost(res.data.data.content);
      return { article: res.data.data };
    });
  },
  mounted: function () {
    this.$nextTick(function () {
      //   this.init();
    });
  },
  methods: {
    init: function () {

    },
    onReady(editor) {
      this.editor = editor;
      this.$refs.toolbar.appendChild(editor.ui.view.toolbar.element);
    },
    wordCount: function () {
      function modelElementToPlainText(element) {
        if (element.is("text") || element.is("textProxy")) {
          return element.data;
        }
        let text = "";
        let prev = null;
        for (const child of element.getChildren()) {
          const childText = modelElementToPlainText(child);
          // If last block was finish, start from new line.
          if (prev && prev.is("element")) {
            text += "\n";
          }
          text += childText;
          prev = child;
        }
        return text;
      }
      const txt = modelElementToPlainText(this.editor.model.document.getRoot());
      return txt.replace(/\n/g, "").length;
    },
    onCommit: function () {
      var that = this;
      var words = that.wordCount();
      if (!that.article.title) {
        that.$message.error("标题不能为空！");
        return;
      }
      if (that.article.title.length > 30) {
        that.$message.error("标题最多输入30个字！");
        return;
      }

      if (words < 10 || words > 10000) {
        that.$message.error("请输入10-10000个字的内容！");
        return;
      }
      that.article.content = that.editor
        .getData()
        .replace(new RegExp(that.res, "g"), "$RESOURCE");

      api
        .post(`/articles/${that.article.id}/update`, {
          id: that.article.id,
          userId: that.article.user.id,
          title: that.article.title,
          content: utils.replaceRes(this.article.content)
        })
        .then(function (res) {
          if (res.data.success) {
            that.$message.success("保存成功！");
            window.location.href = that.ctx + "/articles/" + that.article.id;
          } else {
            that.$message.error("保存失败！");
            console.log(res.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getUser: function (user) {
      this.user = user;
        this.article.user.id = this.user.id;
    },
  },
};
</script>
