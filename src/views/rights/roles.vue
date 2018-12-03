<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <div style="margin-top: 15px;">
      <el-button
        type="success"
        plain
        @click="rolesdialogFormVisible=true"
      >添加角色</el-button>
    </div>
    <!-- 角色信息展示列表 -->
    <template>
      <el-table
        :data="rolesListData"
        border
        style="width: 100%; margin-top: 15px;"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <span>这里是展开数据显示区</span>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
        >
        </el-table-column>
        <el-table-column
          label="描述"
          prop="roleName"
        >
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top"
              >
                <el-button
                  type="primary"
                  plain
                  class="el-icon-edit"
                  @click="handleEdit(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <el-button
                  plain
                  type="danger"
                  class="el-icon-delete"
                  @click="handleDelete(scope.row.id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="授权角色"
                placement="top"
              >
                <el-button
                  plain
                  type="success"
                  class="el-icon-check"
                  @click="handleImpower(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { getUserRolesList } from '@/api'

export default {
  data () {
    return {
      rolesdialogFormVisible: false,
      rolesListData: []
    }
  },
  methods: {
    init () {
      getUserRolesList().then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.rolesListData = res.data
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
</style>
