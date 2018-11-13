<template>
    <div id="Index">
        <el-row><el-col :span="12" :offset="4">
        <!-- <div v-for="post in posts" v-bind:key="post.value"> -->
        <div v-for="(post,index) in posts" 
        v-if="index >= (currentPage-1)*pageSize && index < currentPage*pageSize" v-bind:key="post.value">
            <a href="javascript:void(0)" v-on:click="cardDetail(post.id)"><el-card class="articleCard" shadow="hover">
                <el-row><el-col :span="16"><div class="article-word">
                    <span class="title-font">{{ post.name }}</span>
                    <div class="description-font">
                        {{ post.simpleArticleContent }}
                    </div>
                </div>
                <div class="foot-icon">
                    {{ post.username }} <i class="el-icon-view el-icon-sty"></i> {{ post.watchNum }}
                </div></el-col>
                <el-col :span="8">
                    <div class="article-img">
                        <img v-bind:src="post.simpleImgUrl" width="100%">
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
      isLoaded: 0
    };
  },
  methods: {
    cardDetail: function(articleId) {
      console.log(articleId);
      this.$router.push("/we/viewArticle/" + articleId);
    }
  },
  created: function() {
    if (this.isLoaded === 1) {
        return;
    }
    const loading = this.$loading({
      lock: true,
      text: "宝贝，正在拼命加载哦～",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0)"
    });

    this.$axios
      .get(this.HOST + "/article/simple-page?currentPage=1&pageSize=1000")
      .then(res => {
        this.posts = res.data.data.page.content;
        loading.close();
        this.currentPage = res.data.data.page.currentPage;
        this.pageSize = res.data.data.page.pageSize;
        console.log(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
    this.isLoaded = 1;
  }
};
</script>

<style>
.articleCard {
  margin-top: 9px;
  width: 600px;
  height: 180px;
}
.article-word {
  height: 116px;
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
  margin-bottom: 7px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.foot-icon {
  font-size: 13px;
  color: #999;
  padding-left: 0px;
}
.el-icon-sty {
  padding-left: 7px;
}
.article-img {
  margin-left: 17px;
  height: 137px;
  overflow: hidden;
}
</style>