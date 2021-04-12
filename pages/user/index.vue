<template>
  <div>
    <liu-header
      @get-user="getUser"
      :tab-id="0"
    ></liu-header>
    <liu-main>
      <!-- top -->
      <liu-user-header :user="user"></liu-user-header>
      <!-- content -->
      <div class="auto_box user_main_box">
        <liu-user-nav :active="'userInfo'"></liu-user-nav>
        <div class="p_ibt user_content_box">
          <div class="user_content_title">
            <span class="title">个人信息</span>
            <div class="right">
              <a
                @click="editUserInfoBtn"
                class="iconfont icon-edit"
                href="javascript:;"
              >编辑</a>
            </div>
          </div>
          <div class="user_base_box">
            <div class="item_box">
              <span class="p_ibt name">头像</span>
              <div class="p_ibt value box_sizing">
                <a
                  @click="uploadHeadbtn"
                  href="javascript:;"
                >更换头像</a>
              </div>
            </div>
            <div class="item_box">
              <span class="p_ibt name">昵称</span>
              <div class="p_ibt value box_sizing">{{user.nickname}}</div>
            </div>
            <div class="item_box">
              <span class="p_ibt name">性别</span>
              <div class="p_ibt value box_sizing">{{userSex[user.sex]}}</div>
            </div>
            <div class="item_box">
              <span class="p_ibt name">年龄</span>
              <div class="p_ibt value box_sizing">{{user.age}}</div>
            </div>
            <div class="item_box">
              <span class="p_ibt name">电话</span>
              <div class="p_ibt value box_sizing">{{user.phone}}</div>
            </div>
            <div class="item_box">
              <span class="p_ibt name">邮箱</span>
              <div class="p_ibt value box_sizing">{{user.email}}</div>
            </div>
            <div class="item_box">
              <span class="p_ibt name">住址</span>
              <div class="p_ibt value box_sizing">{{user.address}}</div>
            </div>
            <div class="item_box">
              <span class="p_ibt name">个性签名</span>
              <div class="p_ibt value box_sizing">{{user.signature}}</div>
            </div>
          </div>
        </div>
      </div>
    </liu-main>
    <liu-footer></liu-footer>
    <el-dialog
      class="liu_dialog user_upload_head"
      title="更换头像"
      :visible.sync="showUploadHead"
      top="20vh"
      width="480px"
      :close-on-click-modal="false"
      :before-close="onCloseUploadHead"
      style="display:none;"
    >
      <div class="dialog_content">
        <img
          class="img"
          :src="uploadHeadImg"
        />
        <el-upload
          ref="upload"
          :action="api+'/user/upload/avatar'"
          :show-file-list="false"
          :auto-upload="false"
          :on-success="onSuccess"
          :on-change="onChange"
          with-credentials
        >
          <span>上传头像</span>
        </el-upload>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="onCloseUploadHead">取 消</el-button>
        <el-button
          type="primary"
          @click="onCommitHead"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      class="liu_dialog user_edit_info"
      title="编辑个人信息"
      :visible.sync="isUserEidtInfo"
      top="20vh"
      width="480px"
      :close-on-click-modal="false"
      :before-close="onCloseUserEdit"
      style="display:none;"
    >
      <div class="dialog_content">
        <div class="option_box">
          <span class="p_ibt name">昵称：</span>
          <div class="p_ibt">
            <input
              v-model.trim="editUser.nickname"
              class="input0"
              type="text"
              name="nickname"
              maxlength="16"
            />
            <div class="error">{{nicknameError}}</div>
          </div>
        </div>
        <div class="option_box">
          <span class="p_ibt name type1">性别：</span>
          <div class="p_ibt">
            <el-radio-group v-model="editUser.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
              <el-radio :label="2">保密</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="option_box Mtp20">
          <span class="p_ibt name">年龄：</span>
          <div class="p_ibt">
            <input
              v-model.number="editUser.age"
              class="input0"
              type="text"
              name="age"
              maxlength="3"
            />
            <div class="error">{{ageError}}</div>
          </div>
        </div>
        <div class="option_box">
          <span class="p_ibt name">手机：</span>
          <div class="p_ibt">
            <input
              v-model.trim="editUser.phone"
              class="input0"
              type="text"
              name="phone"
              maxlength="11"
            />
            <div class="error">{{phoneError}}</div>
          </div>
        </div>
        <div class="option_box">
          <span class="p_ibt name">邮箱：</span>
          <div class="p_ibt">
            <input
              v-model.trim="editUser.email"
              class="input0"
              type="text"
              name="email"
              maxlength="50"
            />
            <div class="error">{{emailError}}</div>
          </div>
        </div>
        <div class="option_box">
          <span class="p_ibt name">住址：</span>
          <div class="p_ibt">
            <input
              v-model.trim="editUser.address"
              class="input0"
              type="text"
              name="address"
              maxlength="200"
            />
            <div class="error">{{addressError}}</div>
          </div>
        </div>
        <div class="option_box">
          <span class="p_ibt name">个性签名：</span>
          <div class="p_ibt">
            <textarea
              v-model.trim="editUser.signature"
              class="textarea0"
              maxlength="100"
            ></textarea>
            <div class="error">{{signatureError}}</div>
          </div>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="onCloseUserEdit">取 消</el-button>
        <el-button
          type="primary"
          @click="onCommitEidt"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LiuHeader from "~/components/header.vue";
import LiuFooter from "~/components/footer.vue";
import LiuMain from "~/components/main.vue";
import LiuLogin from "~/components/login.vue";
import LiuUserHeader from "~/components/userHeader.vue";
import LiuUserNav from "~/components/userNav.vue";

import vuexStore from "~/components/vuexStore.js";
import utils from "~/assets/js/utils.js";

export default {
  components: {
    LiuHeader,
    LiuFooter,
    LiuMain,
    LiuLogin,
    LiuUserHeader,
    LiuUserNav,
  },
  data: function () {
    return {
      user: {},
      userSex: utils.userSex,
      articles: [],
      showLogin: 0,
      showUploadHead: false,
      uploadHeadImg: "",
      isUserEidtInfo: false,
      editUser: {},
      nicknameError: "",
      ageError: "",
      phoneError: "",
      emailError: "",
      addressError: "",
      signatureError: "",
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.init();
    });
  },
  methods: {
    init: function () {},
    toLogin: function (i) {
      this.showLogin = i;
    },
    closeLogin: function () {
      this.showLogin = 0;
    },
    onCloseUploadHead: function () {
      this.showUploadHead = false;
    },
    onCommitHead: function () {
      this.$refs.upload.submit();
      // this.uploadHeadImg = URL.createObjectURL(file.raw);
    },
    onSuccess: function (res, file) {
      if (res.message == "success") {
        this.showUploadHead = false;
        window.location.reload();
      } else {
        this.$message("上传失败!");
      }
    },
    onChange: function (file, fileList) {
      const isJPG =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt2M = file.size / 1024 < 500;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
        this.$refs.upload.uploadFiles.pop();
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 500KB!");
        this.$refs.upload.uploadFiles.pop();
        return;
      }
      this.$refs.upload.uploadFiles = [file];
      this.uploadHeadImg = window.URL.createObjectURL(file.raw);
    },
    uploadHeadbtn: function () {
      this.uploadHeadImg = this.res + this.user.avatar;
      this.showUploadHead = true;
    },
    getUser: function (user) {
      this.user = user;
    },
    initUser: function () {
      var that = this;
      this.$axios.get("/api/user/userInfo").then((res) => {
        if (res.data.success) {
          that.user = res.data.data;
        } else {
          window.reload();
        }
      });
    },
    onCloseUserEdit: function () {
      this.isUserEidtInfo = false;
      this.editUser = {};
    },
    onCommitEidt: function () {
      var param = {
        nickname: this.editUser.nickname,
        sex: this.editUser.sex,
        age: this.editUser.age,
        phone: this.editUser.phone,
        email: this.editUser.email,
        nickname: this.editUser.nickname,
        address: this.editUser.address,
        signature: this.editUser.signature,
      };
      if (
        (_.isNil(param.nickname) ||
          !_.isString(param.nickname) ||
          _.size(param.nickname) < 1 ||
          _.size(param.nickname) > 20) &&
        param.nickname != ""
      ) {
        this.nicknameError = "昵称为1-20个字符";
        return;
      } else {
        this.nicknameError = "";
      }
      if (
        !_.isNil(param.age) &&
        param.age !== "" &&
        !utils.isInteger(param.age)
      ) {
        this.ageError = "年龄不符合规则！";
        return;
      } else {
        this.ageError = "";
      }
      if (
        !_.isNil(param.phone) &&
        param.phone !== "" &&
        !utils.isPhone(param.phone)
      ) {
        this.phoneError = "手机号不符合规则！";
        return;
      } else {
        this.phoneError = "";
      }
      if (
        !_.isNil(param.email) &&
        param.email !== "" &&
        !utils.isEmail(param.email)
      ) {
        this.emailError = "邮箱不符合规则！";
        return;
      } else {
        this.emailError = "";
      }
      if (
        !_.isNil(param.signature) &&
        param.signature !== "" &&
        /\n/g.test(param.signature)
      ) {
        this.signatureError = "个性签名不符合规则！";
        return;
      } else {
        this.signatureError = "";
      }

      this.$axios
        .post("/api/users/" + this.user.id + "/update", param)
        .then((res) => {
          if (res.data.success) {
            this.onCloseUserEdit();
            this.$message.success("修改成功！");
            this.initUser();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("服务器错误！");
        });
    },
    editUserInfoBtn: function () {
      this.editUser = _.clone(this.user);
      this.isUserEidtInfo = true;
    },
  },
};
</script>
