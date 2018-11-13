<template>
    <div id="viewArticle">
      <el-row><el-col :span="12" :offset="4">
        <div id="title">{{ this.article.articleName }}</div>
        <mavon-editor v-html="article.articleContent" :subfield="false" :defaultOpen="defaultData" :toolbarsFlag="true" :boxShadow="false"/>
      </el-col></el-row>
    </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Qs from "qs";
export default {
  name: "ViewArticle",
  components: {
    mavonEditor
  },
  data() {
    return {
      article: {},
      defaultData: "preview",
      articleId: this.$route.params.articleId
    };
  },
  methods: {
    getArticle: function() {}
  },
  created: function() {
    this.$axios
      .get(this.HOST + "/article?id=" + this.articleId)
      .then(res => {
        this.article = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
#viewArticle {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  /* margin-top: 40px; */
}
#title {
  margin: 20px 0 20px 0;
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
  color: inherit;
}
</style>