// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import Axios from 'axios'
import VueRouter from 'vue-router'
import WriteArticle from './components/WriteArticle'
import ViewArticle from './components/ViewArticle'
import Index from './components/Index'
import Tech from './components/Tech'
import Essay from './components/Essay'
import Alg from './components/Algorithm'
import Java from './components/Java'
import Store from './store'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$axios = Axios;
Vue.prototype.HOST = "http://39.105.16.182:9998/we/api/v1";
// Vue.prototype.HOST = "http://localhost:9998/we/api/v1";

Vue.prototype.$store = Store

Vue.config.productionTip = false

//设置路由
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/writeArticle', component: WriteArticle },
    // { path: '/viewArticle/:articleId', component: ViewArticle },
    { path: '/viewArticle', component: ViewArticle },
    { path: '/index', component: Index },
    { path: '/tech', component: Tech },
    { path: '/essay', component: Essay },
    { path: '/alg', component: Alg },
    { path: '/java', component: Java }
  ]
})

router.beforeEach(function (to, from, next) {
  document.getElementsByTagName("body")[0].style = '';
  next();
})

//request拦截器
Axios.interceptors.request.use(
  config => {
    // console.log(config);
    config.headers['Authorization'] = Store.get("token") ? Store.get("token") : "";
    return config;
  }
);

Axios.interceptors.response.use(response => {
  // console.log(response.status);
  return response;
}, error => {
  // console.log(error.response, 'error.response');

  if (error.response.status == 401) {

    Store.del("token");
    Store.del("userStatus");
    Store.del("username");
    Store.set("state", 1);
    console.log(401);
    return Promise.reject(error);
  }

  return Promise.reject(error);
});

new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})