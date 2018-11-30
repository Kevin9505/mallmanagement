import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import User from '@/views/users/User'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: {
      path: '/login'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: '/user',
      name: 'User',
      component: User
    }]
  }
  ]
})
