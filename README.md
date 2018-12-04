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
# 添加请求拦截器 
-- 因为除了登录页不需要 Authorization , 其他页面都需要在请求头上带上 token 不然不能请求到数据
` 利用 axios 在请求之前添加拦截器 `
```js
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
  ```
# api 请求接口暴露
`由于网站的请求接口都放在一个文件上,需要用 export 来暴露接口`
```js
export const login = (params) =>{
  return axios.post('login',params)
    .then((results) => {
      return results.data
    })
}

// 在导入的时候 需要 { } => 代表众多成员中的谋一个
import { login } from './api/index/js'
```
# 表单的验证
` 利用element 框架 form 组件提供的表单验证功能,通过 rules 属性传入约定的验证规则,并将 form-item 的 prop 属性设置为需校验的字段名即可. `
```js
  // 例子
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
  </el-form>
  <script>
     export default {
      data(){
      return{
        ruleForm: {
          name: ''
        }，
        rules:{
          name:[
            // trigger 触发器
            { required:true, message:'请输入活动名称', trigger:'blur' }
          ]
        }
      }
    },
    methods: {
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  </script>
 
```
# 实现角色授权提交
```js
  grantRolesSubmit () {
    // 通过 element 提供的 this.$refs.tree.getCheckedNodes() 方法获取选中节点的 id 
    var checkNode = this.$refs.tree.getCheckedNodes()
    // 通过 array.map((item,index) => { return ... }) 遍历对象数组
    var checkNodeId = checkNode.map((item, index) => {
      return item.id + ',' + item.pid   // ["105,104,101","116,104,101"]
    })
    // 通过 array.join(',') 方法将数组转换为字符串
    var joinStr = checkNodeId.join(',')
    // 通过 new Set() 去除重复字符, 利用 Array.from() 将 Set结构转换为数组 str.split(',') 将字符串转为数组
    var setStr = Array.from(new Set(joinStr.split(',')))
    var finaRid = setStr.join(',')
    // console.log(this.roleId)
    // 发送请求
    grantRolesById(this.roleId, finaRid).then(res => {
      // console.log(res)
      if (res.meta.status === 200) {
        this.$message({
          message: res.meta.msg,
          type: 'success'
        })
        this.grantdialogFormVisible = false
      } else {
        this.$message({
          message: res.meta.msg,
          type: 'error'
        })
      }
    })
  }

```








