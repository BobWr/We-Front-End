export default  {
  get (key) {
    return window.localStorage.getItem(key);
  },
  set (key,value) {
    window.localStorage.setItem(key, value);
  },
  del (key){
    window.localStorage.removeItem(key);
  }
}

// state 用来标识顶部导航栏的active
// lastUrl 用来记录最后一次访问的url，便于刷新页面
// username
// userStatus 1已登陆，0未登录
// token 