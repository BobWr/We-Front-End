<template>
  <div id="Index">
    <el-row>
      <el-col :span="12" :offset="4">
        <el-carousel :interval="2000" arrow="hover" height="200px" class="carousel">
          <el-carousel-item class="carousel-item">
            <div class="carousel-item-div">哈哈哈哈</div>
          </el-carousel-item>
          <el-carousel-item class="carousel-item">
            <div class="carousel-item-div">第一版</div>
          </el-carousel-item>
          <el-carousel-item class="carousel-item">
            <div class="carousel-item-div">上线啦！🎉🎉🎉</div>
          </el-carousel-item>
        </el-carousel>
        <div
          v-for="(post,index) in posts"
          v-if="index >= (currentPage-1)*pageSize && index < currentPage*pageSize"
          v-bind:key="post.value"
        >
          <a href="javascript:void(0)" v-on:click="cardDetail(post.id)">
            <el-card class="articleCard" shadow="hover">
              <el-row>
                <el-col :span="post.simpleImgUrl != undefined ? 16 : 24">
                  <div class="article-word">
                    <span class="title-font" style="-webkit-box-orient: vertical;">{{ post.name }}</span>
                    <div
                      class="description-font"
                      style="-webkit-box-orient: vertical;"
                    >{{ post.simpleArticleContent }}</div>
                  </div>
                  <div class="foot-icon">
                    {{ post.username }}
                    <i class="el-icon-view el-icon-sty"></i>
                    {{ post.watchNum }}
                    <span id="tag" :style="post.tagColor">{{post.tagName}}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div
                    v-if="post.simpleImgUrl != undefined"
                    class="article-img"
                    :style="post.simpleImgUrl"
                  >
                    <!-- <img v-bind:src="post.simpleImgUrl" width="100%"> -->
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </a>
        </div>
      </el-col>
    </el-row>
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
      isLoaded: 0,
      type: ["all"]
    };
  },
  methods: {
    cardDetail: function(articleId) {
      // console.log(articleId);
      this.$store.set("articleId", articleId);
      // console.log(this.$store.get("articleId"));
      this.$router.push("/viewArticle");
    }
  },
  created: function() {
    //本地存储，设置顶部导航栏以及url信息
    this.$store.set("state", "1");
    this.$store.set("lastUrl", "/index");
    this.state = this.$store.get("state");
    if (this.isLoaded === 1) {
      return;
    }
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
          this.type
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
    this.isLoaded = 1;
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
  margin-bottom: 7px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.foot-icon {
  font-size: 13px;
  color: rgb(131, 131, 131);
  margin-top: 10px;
  padding-left: 0px;
}
/*文章类型标签*/
#tag {
  /* background-color: #ff40403a; */
  font-size: 11px;
  padding: 0 3px 0 2px;
  margin-left: 7px;
  border-radius: 2px;
  /* color: rgb(44, 44, 44); */
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

/*轮播图*/
.carousel {
  width: 600px;
  margin-bottom: 27px;
}
.carousel-item {
  background-color: #e05252;
  /* background-image: url("http://img2we.baojk.cn:9990/umaru.jpeg"); */
}
.carousel-item-div {
  position: relative;
  top: 40%;
  text-align: center;
  color: #409eff;
}
</style>