<template>
  <div>
    <!-- header -->
    <LiuHeader :tab-id="4" @get-user="getUser"></LiuHeader>
    <LiuMain>
      <div class="auto_box Ptp60" style="width:900px;">
        <div>
          <el-input
            placeholder="请输入标题（最多50个字）"
            v-model.trim="article.title"
            :maxlength="50"
            :minlength="3"
            clearable
          ></el-input>
        </div>
        <div class="Ptp30">
          <div ref="toolbar"></div>
          <div class="Mtp30 posr">
            <div v-show="placeholder" class="ckeditor_placeholder">请输入正文</div>
            <div id="editor"></div>
          </div>
        </div>
        <div class="Ptp30 Tright">
          <el-button @click="onCommit" type="primary" round size="medium">提 交</el-button>
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
    LiuFooter
  },
  head(){
      return {
          title:"写文章"+this.title
      }
  },
  data: function() {
    return {
      article: {
        article_title: "",
        article_content: "",
        user_id: undefined
      },
      showUploadHead: true,
      user: {},
      editor: {},
      placeholder: true,
      content: ""
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.init();
    });
  },
  methods: {
    init: function() {
      var that = this;
      // 初始化编辑器
      ckeditorDocument
        .create(
          document.querySelector("#editor"),
          utils.getEditorConfig({
            extraPlugins: [uploadAdapter("/editor/upload?action=uploadimage")]
          })
        )
        .then(editor => {
          that.$refs.toolbar.appendChild(editor.ui.view.toolbar.element);
          that.editor = editor;
          editor.model.document.on("change:data", e => {
            that.content = editor.getData();
            if (!that.content) {
              that.placeholder = true;
            } else {
              that.placeholder = false;
            }
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    onReady(editor) {
      this.ckEditor = editor;
      this.$refs.toolbar.appendChild(editor.ui.view.toolbar.element);
    },
    wordCount: function() {
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
    onCommit: function() {
      var that = this;
      var words = that.wordCount();
      if (that.article.title.length > 50) {
        that.$message.error("标题最多输入50个字！");
        return;
      }

      if (words < 9 || words > 5000) {
        that.$message.error("请输入9-5000个字的内容！");
        return;
      }
      that.article.content = utils.replaceRes(that.editor.getData())

      api
        .post("/article/create", that.article)
        .then(function(res) {
          if (res.data.message == "success") {
            that.$message.success("创建成功！");
            window.location.href = "/articles";
          } else {
            that.$message.error("创建失败！");
            console.log(res.data.message);
          }
        })
        .catch(function(error) {
          if (api.isCancel(thrown)) {
            console.log("Request canceled", thrown.message);
          } else {
            console.log(error);
          }
        });
    },
    getUser: function(user) {
      this.user = user;
    }
  }
};
</script>
