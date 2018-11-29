# admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 设置导航守卫
```js
  router.beforeEach((to, from, next) => {
    // 获取 token 
    const userToken = sessionStrorage.getItem('userToken')
    // 判断是否存在 token 或是 访问的是 登录页
    if(userToken || to.path === '/') {
      next()
    } else {
      next({
        path:'/'
      })
    }
  })
```
# 添加请求拦截器 -- 因为除了登录页不需要 Authorization , 其他页面都需要在请求头上带上 token 不然不能请求到数据
` 利用 axios 在请求之前添加拦截器 `
axios.interceptors.request.use(function(config){
  // 获取token
  const userToken = sessionStrosge.getItem('userToken')
  
  if(userToken){
    config.headers['Authorization']=userToken
  }
  return config
  },function(error){
    // 请求错误时执行
    return Promise.reject(error)
  })







