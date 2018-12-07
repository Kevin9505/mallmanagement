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

# 登录状态保存
` HTTP请求是无状态的 `
+ cookie 
  + 保存在客户端
  + 数据量小(很多站点对cookie 的大小和数量都进行了限制)
  + 不安全(别人可以分析存放在本地的cookie 并进行 cookie 欺骗，也可能被拦截)
+ session
  + 服务器端
  + 安全
  + session可以依赖cookie，也可以不依赖使用url
  + 访问量增多，占用服务器资源，如果服务器挂了，所有保存的信息都没了
+ token
  + 服务器不存在用户状态，定义通用算法
  + 客户端第一次登录后，服务器会生成一个 token 返回给客户端
  + 后续所有请求都会带着token
  + 服务器根据算法校验token的合法性
  
# 设置导航守卫
` https://router.vuejs.org/zh-cn/advanced/navigation-guards.html `
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
# axios 添加请求拦截器 
` https://github.com/axios/axios `
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
        // 通过 this.$refs[formName].validate((valid) => { if(valid){} } 判断输入是否1为空
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
# 获取节点树中选中的节点
```js
  // 获取当前角色的所有权限 data 传过来的数据
  data.children.forEach((first, index) => {
    // 判断是否存在且长度大于0
    if (first.children && first.children.length !== 0) {
      first.children.forEach((second, index) => {
        if (second.children && second.children.length !== 0) {
          second.children.forEach((third, index) => {
            this.defaultcheckedkeys.push(third.id)
          })
        }
      })
    }
  })
```
# Vuex
## Vuex 是什么
 `Vuex是一个针对Vue.js开发的状态管理模式。说简单点儿就是一个工具，可以管理（修改或设置）所有组件用到的数据，而不需要借助之前的event bus或者props在组件间传值。`
## Vuex 的使用场景
` 大型单页应用程序,存在多组件共享数据的时候,需要用到 `
## Vuex 核心内容

` state(一个容器对象，存储Vuex中的state,mutations,actions,getters等) `
+ state(一个保存数据的对象，对象中的数据可以提供所有组件使用)
```js
  // 1. 定义
  const state = {
    count: 0
  }
  // 2. 获取state中的值
  this.$store.state.count
  // mapState 辅助函数获取多个state的值
  import { mapState } from 'vuex'
  computed: mapState({
    // 箭头函数可以使代码更简练
    count: state => state.count,
    // 传字符串参数 'count' 等同于 ` state => state.count `
    countAlias: 'count',
  })
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'count'
  ])
  // 3. 与组件的计算属性混合使用
  computed: {
    localComputed () { /* ... */ },
    ...mapState({
      // ...
    })
  }
```
+ mutations (一个对象，保存的是更改state的函数，也只有它能更改state中的值，触发方式this.$store.commit('函数名',参数))
```js
  // 1. 定义
  const mutations = {
    increment (state) {
      state.count++
    }
  }
  // 2. 触发
  this.$state.commit('increment')
  // 3. 传递参数，通常参数应该是一个对象
  mutations: {
    increment (state,n) {
      state.count += n
    }
  }
  this.$store.commit('increment', 10)
  // 4. 在组件的方法中使用
  methods: {
    ...mapMutations([
      'increment',  // 将 ` this.incrementBy(amount) `映射为 ` this.$store.commit('ind=crement') `
    ])
  }
```
+ action(一个对象，保存的是触发 mutations 的函数，让mutations去修改state中的值)
```js
  // 1. 定义
  const actions = {
    increment: ({ commit }) => commit('increment')
  }
  // 2. 触发
  this.$store.dispatch('increment')
  // 3. 参数支持
  this.$store.dispatch('incrementAsync',{
    amount: 10
  })
  // 4. 组件的方法中使用
  methods: {
    ...mapAction([
      'increment', // 将 ` this.increment() ` 映射为 ` this.$store.dispatch('increment') `
      // ` mapActions `也支持载荷
      'incrementBy' // 将 ` this.incrementBy(amount) ` 映射为 ` this.$store.dispatch('incrementBy',amount) `
    ])
  }

```
+ getters(一个对象，保存的是一些类似于计算属性的函数，可以通过他们得到任何依赖于 state 的新的数据)
```js
  // 1. 定义
  const getters = {
    evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
  }
  // 2. 使用
  this.$store.getters.enenOrOdd
  // 3. 使用其他 getters作为参数
  getters: {
    // ...
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
  // 4. 组件内使用
  export default { 
    // ...
    computed: {
      // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'doneTodosCount',
        'anotherGetter',
        // ...
      ])
    }
  }

```
## 使用 vuex
` npm install vuex -S `
```js
  // store.js
  import Vue from 'vue'
  import Vuex from 'vuex'
  
  Vue.use(Vuex)
  const state = {}
  const mutations = {}
  const actions = {}
  const getters = {}
  export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
  
  new Vue({
    el: '#app',
    store,
    render: h => h(Counter)
  })

```
# vue-quill-sditor 富文本的使用
` npm install vue-quill-editor --save `
```js
  // 在入口 js 中导入
  import VueQuillEditor from 'vue-quill-editor'
  // 依赖的css文件
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  
  Vue.use(VueQuillEditor)
  
```
```js
  // 在组件中使用
  <template>
    <div class="add-goods">
      <el-tabs tab-position="left" class="mt-20">
        <el-tab-pane label="商品内容" name="fifth">
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
        </el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
  <script>
    export default {
      data () {
        return {
          content: null,
          editorOption: {
          }
        }
      },
      methods: {
        onEditorBlur (quill) {
          console.log('editor blur!', quill)
        },
        onEditorFocus (quill) {
          console.log('editor focus!', quill)
        },
        onEditorReady (quill) {
          console.log('editor ready!', quill)
        }
      },
      computed: {
        editor () {
          return this.$refs.myQuillEditor.quill
        }
      }
    }
  </script>
  // 按需修改样式
  <style lang="scss">
    .add-goods {
      .el-tabs {
        height: 400px;
      }
    }
    .quill-editor {
      height: 400px;
      .ql-container {
        height: 300px;
      }
    }
</style>
```
# vue-echarts 的使用
` npm install vue-echarts `
```js
  import ECharts from 'vue-echarts'
  Vue.component('chart',EChrts)
  
  // 组件中使用
  <template>
    <div class='reports'>
      <chart :options='option'></chart>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        option: {
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      };
    }
  };
</script>
```
# vue-amap 地图的使用
` vue-amap 官方文档 ` https://elemefe.github.io/vue-amap/#/ 
` npm install -S vue-amap `
```js
  // 引入vue-amap
  import VueAMap from 'vue-amap'
  Vue.use(VueAMap)
  // 初始化vue-amap
  VueAMap.initAMapApiLoader({
    // 高德的key
    key: '6a204f2b675f32f8849ec4b6b7c21e5c',
    // 插件集合
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 高德 sdk 版本，默认为 1.4.4
    v: '1.4.4'
  });
```
```js
  // 组件中使用
  <template>
    <div id="app">
      <h3 class="title">{{ msg }}</h3>
      <div class="amap-wrapper">
        <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
      </div>
    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        msg: 'vue-amap向你问好！'
      }
    }
  }
  </script>
  // 按需修改样式
  <style>
  .amap-wrapper {
    width: 500px;
    height: 500px;
  }
  </style>
```









