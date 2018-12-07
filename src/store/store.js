// 导入
import Vue from 'vue'
import Vuex from 'vuex'
// 注册使用
Vue.use(Vuex)
// 使用vuex数据是存储在state中,意味着所有你的想操作的数据都存储在这个对象中
const state = {
  // 我们有一个业务需求: 在登录成功之后,在Home组件中能够获取到之前的用户名
  username: ''
}

// mutations 里面定义着操作 State 中数据的函数,通过这个函数我们可以自由的操作数据
const mutations = {
  // 这里面有每一个函数都有一个默认值state,这个state就是store中定义的 State对象
  // 同时还可以传递其他的参数,但是State是第一个参数
  setusername: (state, value) => {
    state.username = value
    localStorage.setItem('username', value)
  }
}

// actions 里面存储着触发 mutations 里面的函数的行为(函数)
const actions = {
  // 触发器: 一个函数的调用会在内部调用其他函数
  setusernameAction: ({commit}, value) => {
    // console.log(value)
    commit('setusername', value)
  }
}

// 属性封装
// 可以来获取 State 中的数据
const getters = {
  username: (state) => {
    return localStorage.getItem('username')
  }
}

// 注册使用
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
