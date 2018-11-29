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
