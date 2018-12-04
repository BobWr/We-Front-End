<template>
  <div id="app">
    <!-- 顶部菜单 -->
    <el-menu
      mode="horizontal"
      background-color="#fff"
      text-color="#333"
      :default-active="this.state"
      active-text-color="#e05252"
      class="isFixed"
    >
      <el-row>
        <el-col :span="2" :offset="4">
          <el-menu-item class="menu-font" v-on:click="jump(1)" index="1">首页</el-menu-item>
        </el-col>
        <el-col :span="2">
          <el-menu-item class="menu-font" v-on:click="jump(3)" index="3">技术</el-menu-item>
        </el-col>
        <el-col :span="2">
          <el-menu-item class="menu-font" v-on:click="jump(4)" index="4">随笔</el-menu-item>
        </el-col>
        <el-col :span="2">
          <el-menu-item class="menu-font" v-on:click="jump(2)" index="2">Write</el-menu-item>
        </el-col>
        <el-col :span="2" :offset="10" class="center-y" v-if="!user_status">
          <span class="log-span">
            <span class="log-span-inner" v-on:click="sign_in">登陆</span>/<span class="log-span-inner" v-on:click="sign_up">注册</span>
          </span>
        </el-col>
        <el-col :span="1" :offset="11" class="center-y" v-if="user_status">
          <div v-if="userWinShow" v-on:mouseover="viewUser" v-on:mouseout="hideUser" id="userWin">
            <el-button type="text" v-on:click="logout" style="color :grey;">退出</el-button>
          </div>
          <div id="log-img" v-on:mouseover="viewUser" v-on:mouseout="hideUser"></div>
        </el-col>
      </el-row>
    </el-menu>
    <router-view></router-view>
    <!-- 登陆框 -->
    <div class="pannel" v-if="isIn">
      <div class="pannel-inner">
        <el-row>
          <el-col :span="1" :offset="24" style="color:rgba(0, 0, 0, 0.2);">
            <i class="el-icon-close" v-on:click="close_sign" style="cursor:pointer;"></i>
          </el-col>
        </el-row>
        <div class="pannel-header">
          <span v-on:click="sign_in" style="cursor:pointer;color:#409eff;">登陆</span>·<span v-on:click="sign_up" style="cursor:pointer;">注册</span>
        </div>
        <el-input v-model="userName_in" placeholder="用户名" style="margin-bottom: 5px;"></el-input>
        <el-input
          type="password"
          v-model="password_in"
          placeholder="密码"
          style="margin-bottom: 5px;"
        ></el-input>
        <span style="color:red; font-size:11px;">{{ in_error }}</span>
        <el-button
          v-on:click="sign_in_commit"
          type="primary"
          size="medium"
          style="width: 100%; margin-top: 11px;"
        >登陆</el-button>
      </div>
    </div>
    <!-- 注册框 -->
    <div class="pannel" v-if="isUp">
      <div class="pannel-inner">
        <el-row>
          <el-col :span="1" :offset="24" style="color:rgba(0, 0, 0, 0.2);">
            <i class="el-icon-close" v-on:click="close_sign" style="cursor:pointer;"></i>
          </el-col>
        </el-row>
        <div class="pannel-header">
          <span v-on:click="sign_in" style="cursor:pointer;">登陆</span>·<span v-on:click="sign_up" style="cursor:pointer;color:#409eff;">注册</span>
        </div>
        <el-input v-model="userName_up" placeholder="用户名,汉字,最多7个字符" style="margin-bottom: 5px;"></el-input>
        <el-input
          type="password"
          v-model="password_up_1"
          placeholder="密码，最少6个字符"
          style="margin-bottom: 5px;"
        ></el-input>
        <el-input
          type="password"
          v-model="password_up_2"
          placeholder="请再次输入密码"
          style="margin-bottom: 5px;"
        ></el-input>
        <span style="color:red; font-size:11px;">{{ up_error }}</span>
        <el-button
          v-on:click="sign_up_commit"
          type="primary"
          size="medium"
          style="width: 100%; margin-top: 11px;"
        >注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      isIn: "",
      isUp: "",
      userName_in: "",
      password_in: "",
      userName_up: "",
      password_up_1: "",
      password_up_2: "",
      state: this.$store.get("state"),
      user_status: "",
      username: "",
      in_error: "",
      up_error: "",
      userWinShow: false
    };
  },
  methods: {
    jump: function(view) {
      if (view == 1) {
        this.$router.push("/index");
      } else if (view == 2) {
        this.$router.push("/writeArticle");
      } else if (view == 3) {
        this.$router.push("/tech");
      } else if (view == 4) {
        this.$router.push("/essay");
      }
    },
    sign_in() {
      this.isIn = true;
      this.isUp = false;
      this.disableScoll();
    },
    sign_up() {
      this.isIn = false;
      this.isUp = true;
      this.disableScoll();
    },
    close_sign() {
      this.in_error = "";
      this.up_error = "";
      this.isIn = false;
      this.isUp = false;
      this.enableScoll();
    },
    disableScoll() {
      document.getElementsByTagName("body")[0].style = "overflow: hidden;";
    },
    enableScoll() {
      document.getElementsByTagName("body")[0].style = "";
    },
    sign_in_commit() {
      this.in_error = "";
      this.$axios
        .post(
          this.HOST +
            "/user?username=" +
            this.userName_in +
            "&password=" +
            this.password_in
        )
        .then(res => {
          console.log(res);
          console.log(res.data);
          if (res.data.code == 0) {
            this.$store.set("token", res.data.data);
            this.$store.set("username", this.userName_in);
            this.$store.set("userStatus", 1);
            this.people_login();
            this.close_sign();
            this.$router.go(0);
          } else {
            this.in_error = res.data.message;
            this.people_logout();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    sign_up_commit() {
      this.up_error = "";

      var reg = new RegExp("^[\u4E00-\u9FFF]+$");
      // alert(reg.test(this.userName_up) + reg);
      if (!reg.test(this.userName_up)) {
        this.up_error = "用户名仅允许汉字！";
        return;
      }

      if (this.userName_up.length > 7) {
        this.up_error = "用户名不可超过7个字符！";
        return;
      }

      if (this.password_up_1.length < 6) {
        this.up_error = "密码长度不可以少于6个字符！";
        return;
      }

      if (this.password_up_1 != this.password_up_2) {
        this.up_error = "两次密码输入不一致！";
        return;
      }

      this.$axios
        .put(
          this.HOST +
            "/user?username=" +
            this.userName_up +
            "&password=" +
            this.password_up_1
        )
        .then(res => {
          if (res.data.code == 0) {
            this.$store.set("username", this.userName_in);
            this.close_sign();
            this.$notify({
              title: "注册成功 🎉🎉🎉,请点击登陆！",
              type: "success",
              position: "top-left",
              offset: 100
            });
          } else {
            this.password_up_1 = "";
            this.password_up_2 = "";
            this.up_error = res.data.message;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    people_login() {
      this.user_status = true;
      this.username = this.$store.get("username");
    },
    people_logout() {
      this.user_status = false;
      this.$store.del("token");
      this.$store.del("userStatus");
      this.$store.del("username");
    },
    viewUser() {
      this.userWinShow = true;
    },
    hideUser() {
      this.userWinShow = false;
    },
    logout() {
      this.$axios
        .delete(this.HOST + "/user")
        .then(res => {
          this.people_logout();
          this.$router.go(0);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created: function() {
    // this.$store.set("token", "ss");
    if (this.$store.get("userStatus") == 1) {
      this.user_status = true;
      this.username = this.$store.get("username");
    }
    this.$router.push(
      this.$store.get("lastUrl") ? this.$store.get("lastUrl") : "/index"
    );
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding-top: 77px;
}
/*登陆注册按钮*/
.log-span {
  position: relative;
  cursor: pointer;
  /* color: aquamarine; */
  font-size: 17px;
  top: 7px;
}
.log-span-inner:hover {
  color: #409eff;
}
/*登陆成功后的头像*/
#log-img {
  height: 40px;
  width: 40px;
  /* background-color: aliceblue; */
  /* background-image: url("./static/1.jpg"); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("http://img2we.baojk.cn:9990/12.jpg");
  cursor: pointer;
  border-radius: 20px;
}
#userWin {
  position: absolute;
  text-align: center;
  /* border: 1px solid black; */
  height: 40px;
  width: 40px;
  background-color: white;
}

.pannel {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1502;
  background-color: rgba(0, 0, 0, 0.7);
}
.pannel-inner {
  position: absolute;
  background-color: white;
  left: 40%;
  top: 30%;
  width: 20%;
  /* border: solid #409eff 1px; */
  padding: 0 17px 17px 17px;
  font-size: 18px;
}
.pannel-header {
  margin-bottom: 7px;
  text-align: center;
}
a:link {
  text-decoration: none;
}

.isFixed {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1501;
  font-size: 21px;
}

.menu-font {
  font-size: 17px;
  /* color: #e05252; */
}

.center-y {
  margin-top: 9px;
  font-size: 17px;
}
</style>