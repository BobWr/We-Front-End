<template>
  <div id="app">
    <el-menu
      mode="horizontal"
      background-color="#fff"
      text-color="#333"
      :default-active="this.activeIndex"
      active-text-color="#e05252" class="isFixed">
      <el-row>
      <el-col :span="2" :offset="4"><el-menu-item class="menu-font" v-on:click="jump(1)" index="1">首页</el-menu-item></el-col>
      <el-col :span="2"><el-menu-item class="menu-font" v-on:click="jump(2)" index="2">创作吧少年</el-menu-item></el-col>
      </el-row></el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  methods: {
    jump: function(view) {
      if (view == 1) {
        this.$router.push("/we/index");
      } else if (view == 2) {
        this.$router.push("/we/writeArticle");
      }
    }
  },
  created: function() {
    // this.$axios.get(this.HOST + "/article", {})
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    if (this.activeIndex == 1) {
      this.$router.push("/we/index");
    } else if (this.activeIndex == 2) {
      this.$router.push("/we/writeArticle");
    }
    console.log(this.activeIndex);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding-top: 77px;
}
a:link {
  text-decoration: none;
}

.isFixed {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000000000;
  font-size: 21px;
}

.menu-font {
  font-size: 17px;
  /* color: #e05252; */
}
</style>
