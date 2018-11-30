// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入公共样式文件
import './common/css/index.scss'
Vue.use(ElementUI)

Vue.config.productionTip = false

// 设置导航守卫 -- 判断用户是否登录过 -- 拦截用户
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 当存在 token 或者 访问的是登录页 都可以跳转 不然默认返回登录页
  const userToken = sessionStorage.getItem('userToken')
  if (userToken || to.path === '/login') {
    next()
  } else {
    next({
      path: '/login'
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
