<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索内容 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="params.query"
        class="input-with-select"
        style="width:300px;"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button
        type="success"
        plain
      >添加用户</el-button>
    </div>
    <!-- 用户列表 -->
    <div
      class="userlist"
      style="margin-top: 15px;"
    >
      <template>
        <el-table
          :data="userInfo"
          border
          style="width: 100%"
        >
          <el-table-column
            type="index"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                plain
                class="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                plain
                type="danger"
                class="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
              <el-button
                plain
                type="success"
                class="el-icon-check"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

  </div>
</template>
<script>
import { getUserList } from '@/api/index'

export default {
  data () {
    return {
      userInfo: [],
      userstatus: true,
      params: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  mounted () {
    getUserList(this.params).then(res => {
      console.log(res)
      if (res.meta.status === 200) {
        this.userInfo = res.data.users
      }
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
