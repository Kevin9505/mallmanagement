import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import User from '@/views/users/User'
import Rights from '@/views/rights/rights'
import Roles from '@/views/rights/roles'

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
    },
    {
      path: '/rights',
      name: 'Rights',
      component: Rights
    },
    {
      path: '/roles',
      name: 'Roles',
      component: Roles
    }]
  }
  ]
})
