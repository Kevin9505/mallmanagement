<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu
          default-active="2"
          :collapse="isCollapse"
          class="el-menu-vertical-demo el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+submenu.path" v-for="submenu in item.children" :key="submenu.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{submenu.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-info"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="rights">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>分类参数</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品分类</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-printer"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>数据报表</span>
              </template>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div
            class="toggle-btn myicon myicon-menu"
            @click="isCollapse=!isCollapse"
          ></div>
          <div class="system-title">电商管理系统</div>
          <div>
            <span class="welcome">你好: {{$store.state.username ? $store.state.username:$store.getters.username}}</span>
            <el-button type="text" @click="logout">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getLeftMenu } from '@/api'

export default {
  data () {
    return {
      isCollapse: false,
      menuList: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    // 退出登录
    logout () {
      console.log(sessionStorage.getItem('userToken'))
      sessionStorage.removeItem('userToken')
      this.$router.push({path: '/login'})
    }
  },
  mounted () {
    getLeftMenu().then(res => {
      // console.log(res)
      if (res.meta.status === 200) {
        this.menuList = res.data
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
