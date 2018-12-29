<template>
  <div id="writeArticle">
    <el-row type="flex" justify="left">
      <el-col :md="4" :offset="4">
        <el-menu default-active="1" class="left-menu isFixed">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>写文章呀&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-news"></i>
            <span slot="title">我的主页</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-tickets"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-star-on"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-bell"></i>
            <span slot="title">悄悄话～</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <!-- <el-col :span="1"></el-col> -->
      <el-col :md="12">
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <br>
      <br>
      <mavon-editor ref=md v-model="editor" style="height: 100%" 
      @change="articleChange" @save="articleSave" @imgAdd="imgAdd" @imgDel="imgDel">
      </mavon-editor>
      <br><br>
      <p>所属分类：</p>
      <el-cascader
        :options="options"
        @change="optionChange"
        v-model="selectedOptions">
      </el-cascader>
      <!-- <el-row>
        <el-col :md="24">
          <el-radio-group v-model="classification">
            <el-radio :label="101">前端</el-radio>
            <el-radio :label="102">后端</el-radio>
            <el-radio :label="103">数据库</el-radio>
            <el-radio :label="104">运维</el-radio>
            <el-radio :label="105">算法</el-radio>
            <el-radio :label="106">奇技淫巧</el-radio>
            <el-radio :label="200">杂谈</el-radio>
          </el-radio-group>
        </el-col>
      </el-row> -->
      <br><br>
      <p>文章权限：</p>
      <el-row>
        <el-col :md="24">
          <el-radio-group v-model="status">
            <el-radio :label="0">私密</el-radio>
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="2">好友可见</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <br>
      <p>是否置顶：</p>
      <el-row>
        <el-col :md="24">
          <el-radio-group v-model="isup">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <br><br>
      <el-row>
        <el-col :md="24">
          <el-button v-on:click="addArticle()" type="primary">发布文章<i class="el-icon-upload el-icon--right"></i></el-button>
          <el-button v-on:click="backToIndex()" type="info" plain>废弃<i class="el-icon-delete el-icon--right"></i></el-button>
        </el-col>
      </el-row>
      <br><br>
    </el-col></el-row>

    <div class="pannel" v-if="isLogin">
      <div class="pannel-inner">
        老铁，不<span>登陆</span>不给写～
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Qs from "qs";
export default {
  name: "WriteArticle",
  components: {
    mavonEditor
  },
  data() {
    return {
      title: "",
      editor: "",
      articleId: -1,
      status: 1,
      isup: 1,
      tempString: ``,
      loading: "",
      isLogin: "",
      classification: 200,
      options: [
        {
          value: 100,
          label: "技术",
          children: [
            {
              value: 101,
              label: "前端"
            },
            {
              value: 102,
              label: "后端"
            },
            {
              value: 103,
              label: "数据库"
            },
            {
              value: 104,
              label: "运维"
            },
            {
              value: 106,
              label: "奇技淫巧"
            }
          ]
        },
        {
          value: 200,
          label: "随笔"
        },
        {
          value: 300,
          label: "算法"
        },
        {
          value: 400,
          label: "Java"
        }
      ],
      selectedOptions: [200]
    };
  },
  methods: {
    optionChange(value) {
      // console.log(this.classification);
      this.classification = value[value.length - 1];
      // console.log(this.classification);
    },
    addArticle: function() {
      this.loading = this.$loading({
        lock: true,
        text: "别急，正在保存文章哦～",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.6)"
      });

      if (this.articleId === -1) {
        this.postArticle(res => {
          this.loading.close();
          console.log(res);
          this.articleId = res.data.data;
          this.afterAdd();
        });
      } else {
        this.patchArticle(res => {
          console.log(res);
          this.loading.close();
          this.afterAdd();
        });
      }
    },
    backToIndex: function() {
      this.$router.push("/index");
    },
    afterAdd: function() {
      this.$confirm("保存成功，您可以点击返回首页或者查看新写的文章哦~ ", "", {
        confirmButtonText: "查看博客",
        cancelButtonText: "返回首页",
        center: true
      })
        .then(() => {
          this.$store.set("articleId", this.articleId);
          this.$router.push("/viewArticle");
        })
        .catch(() => {
          this.$router.push("/index");
        });
    },
    articleChange: function(value, render) {
      this.tempString = render;
      // console.log(this.tempString);
    },
    articleSave: function(value, render) {
      if (this.articleId === -1) {
        this.postArticle(res => {
          this.articleId = res.data.data;
          this.$notify({
            title: "保存成功!",
            type: "success",
            offset: 100
          });
        });
      } else {
        this.patchArticle(res => {
          this.$notify({
            title: "保存成功!",
            type: "success",
            offset: 100
          });
        });
      }
    },
    imgAdd: function(pos, file) {
      if (this.articleId === -1) {
        this.articleId = -2;
        this.$axios
          .post(
            this.HOST + "/article",
            Qs.stringify({
              name: this.title,
              classification: this.classification,
              authorId: 1,
              articleContent: "",
              status: this.status,
              isUp: this.isup
            })
          )
          .then(res => {
            this.articleId = res.data.data;
            this.imgAddHelper(pos, file);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.imgAddHelper(pos, file);
      }
    },
    imgAddHelper: function(pos, file) {
      var formData = new FormData();
      formData.append("multipartFile", file);
      formData.append("articleId", this.articleId);
      this.$axios
        .post(this.HOST + "/article-img", formData, {
          headers: {
            "Content-Type":
              "multipart/form-data;boundary=ldjknfkjdnskjnfjbnreinvnsjkdnfbvihrbvfsvskdnkfhnrjnjfnkrnfkrn"
          }
        })
        .then(res => {
          this.$refs.md.$img2Url(pos, res.data.data);
        })
        .catch(error => {});
    },
    imgDel: function(pos) {
      delete this.img_file[pos];
    },
    postArticle: function(successCallback) {
      //避免用户多次点击
      this.articleId = -2;
      this.$axios
        .post(
          this.HOST + "/article",
          Qs.stringify({
            name: this.title,
            classification: this.classification,
            authorId: 1,
            articleContent: this.tempString,
            status: this.status,
            isUp: this.isup
          })
        )
        .then(res => successCallback(res))
        .catch(error => {
          console.log(error);
        });
    },
    patchArticle: function(successCallback) {
      this.$axios
        .patch(
          this.HOST + "/article",
          Qs.stringify({
            name: this.title,
            classification: this.classification,
            authorId: 1,
            articleContent: this.tempString,
            status: this.status,
            isUp: this.isup,
            id: this.articleId
          })
        )
        .then(res => successCallback(res))
        .catch(error => {
          console.log(error);
        });
    }
  },
  created: function() {
    //本地存储，设置顶部导航栏以及url信息
    this.$store.set("state", "2");
    this.$store.set("lastUrl", "/writeArticle");
    console.log(this.$store.get("userStatus"));
    if (this.$store.get("userStatus") != 1) {
      this.isLogin = true;
      document.getElementsByTagName("body")[0].style = "overflow: hidden;";
    }
  }
};
</script>

<style scoped>
#writeArticle {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  /* margin-top: 40px; */
}
.left-menu {
  margin-right: 20%;
}
.pannel {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1500;
  background-color: rgba(255, 255, 255, 1);
}
.pannel-inner {
  position: absolute;
  /* background-color: black; */
  left: 40%;
  top: 30%;
  width: 20%;
  /* border: solid #409eff 1px; */
  padding: 0 17px 17px 17px;
  font-size: 18px;
}
.isFixed {
  position: fixed;
  border: 1px solid rgba(128, 128, 128, 0.15);
  /* padding-right: 27px; */
  /* border: 0; */
  z-index: 1500;
  background-color: rgb(255, 255, 255);
}
</style>
