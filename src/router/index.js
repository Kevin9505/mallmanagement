import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import User from '@/views/users/User'
import Rights from '@/views/rights/rights'
import Roles from '@/views/rights/roles'
import Goods from '@/views/goods/goods'
import List from '@/views/goods/list'
import Categories from '@/views/goods/categories'
import Params from '@/views/goods/params'
import AddGoods from '@/views/goods/addGoods'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: 'users',
      name: 'User',
      component: User
    },
    {
      path: 'rights',
      name: 'Rights',
      component: Rights
    },
    {
      path: 'roles',
      name: 'Roles',
      component: Roles
    },
    {
      path: 'goods',
      name: 'Goods',
      component: Goods,
      redirect: {
        name: 'List'
      },
      children: [{
        path: 'list',
        name: 'List',
        component: List
      },
      {
        path: 'addGoods',
        name: 'AddGoods',
        component: AddGoods
      }]
    },
    {
      path: 'categories',
      name: 'Categories',
      component: Categories
    },
    {
      path: 'params',
      name: 'Params',
      component: Params
    }
    ]
  }
  ]
})
