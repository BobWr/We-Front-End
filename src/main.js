// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import WriteArticle from './components/WriteArticle'
import ViewArticle from './components/ViewArticle'
import Index from './components/Index'

//element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'
import VueRouter from 'vue-router'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$axios = Axios;
Vue.prototype.HOST = "/api";
Vue.prototype.activeIndex = "1";

Vue.config.productionTip = false

//设置路由
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/we/writeArticle', component: WriteArticle },
    { path: '/we/viewArticle/:articleId', component: ViewArticle },
    { path: '/we/index', component: Index }
  ]
})

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { WriteArticle },
//   template: '<WriteArticle/>'
// })

Vue.component('articleCard', {
  props: ['value', 'title'],
  data: function () {
    return {

    }
  },
  template: `
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
            <span>{{ title }}</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
        </div>
        {{ value }}
    </el-card>`
})

new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
