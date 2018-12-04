<template>
    <div id="Index">
        <el-row><el-col :span="12" :offset="4">
        <el-form ref="form" :model="form" label-width="0"><el-form-item label="">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="前端" name="type"></el-checkbox>
                <el-checkbox label="后端" name="type"></el-checkbox>
                <el-checkbox label="数据库" name="type"></el-checkbox>
                <el-checkbox label="运维" name="type"></el-checkbox>
                <el-checkbox label="算法" name="type"></el-checkbox>
                <el-checkbox label="奇技淫巧" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item></el-form>
        <div v-if="posts.length == 0" style="color: rgba(0, 0, 0, 0.5);">你还没有选择想看的文章类型，尝试从上面选一些吧～</div>
        <div v-for="(post,index) in posts" 
        v-if="index >= (currentPage-1)*pageSize && index < currentPage*pageSize" v-bind:key="post.value">
            <a href="javascript:void(0)" v-on:click="cardDetail(post.id)"><el-card class="articleCard" shadow="hover">
                <el-row><el-col :span="post.simpleImgUrl != undefined ? 16 : 24"><div class="article-word">
                    <span class="title-font" style="-webkit-box-orient: vertical;">{{ post.name }}</span>
                    <div class="description-font" style="-webkit-box-orient: vertical;">
                        {{ post.simpleArticleContent }}
                    </div>
                </div>
                <div class="foot-icon">
                    {{ post.username }} <i class="el-icon-view el-icon-sty"></i> {{ post.watchNum }}
                </div></el-col>
                <el-col :span="8">
                    <div v-if="post.simpleImgUrl != undefined" class="article-img" :style="post.simpleImgUrl">
                        <!-- <img v-bind:src="post.simpleImgUrl" width="100%"> -->
                    </div>
                </el-col></el-row>
            </el-card></a>
        </div></el-col></el-row>
    </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      posts: [],
      currentPage: "",
      pageSize: "",
      articleId: 1,
      form: {
        type: []
      }
    };
  },
  watch: {
    form: {
      handler(val) {
        console.log(val.type);
        this.select();
      },
      deep: true
    }
  },
  methods: {
    cardDetail: function(articleId) {
      //   console.log(articleId);
      this.$store.set("articleId", articleId);
      this.$router.push("/viewArticle");
    },
    select() {
      this.posts = [];

      const loading = this.$loading({
        lock: true,
        text: "宝贝，正在拼命加载哦～",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      this.$axios
        .get(
          this.HOST +
            "/article/simple-page?currentPage=1&pageSize=1000&classficationList=" +
            this.form.type
        )
        .then(res => {
          this.posts = res.data.data.page.content;
          loading.close();
          this.currentPage = res.data.data.page.currentPage;
          this.pageSize = res.data.data.page.pageSize;
          // console.log(res.data.data);
        })
        .catch(error => {
          // console.log(error);
          loading.close();
        });
    }
  },
  created: function() {
    //本地存储，设置顶部导航栏以及url信息
    this.$store.set("state", "3");
    this.$store.set("lastUrl", "/tech");
    this.state = this.$store.get("state");

    this.select();
  }
};
</script>

<style scoped>
.articleCard {
  margin-top: 9px;
  width: 600px;
  height: 154px;
}
.article-word {
  height: 86px;
}
.title-font {
  display: inherit;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 7px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.description-font {
  font-size: 13px;
  font-weight: 430;
  line-height: 24px;
  color: #999;
  /* color: rgba(0, 0, 0, 0.397); */
  margin-bottom: 7px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.foot-icon {
  font-size: 13px;
  color: #999;
  margin-top: 10px;
  padding-left: 0px;
}
.el-icon-sty {
  padding-left: 7px;
}
.article-img {
  margin-left: 37px;
  margin-top: 7px;
  height: 97px;
  width: 147px;
  /* overflow: hidden; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 4px;
}
</style>