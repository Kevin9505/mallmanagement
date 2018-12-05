<template>
  <div class="rights">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限列表 -->
    <template>
      <el-table
        :data="rightsList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="层级"
        >
        <template slot-scope="scope">
          <span>{{scope.row.level | levelFormat}}</span>
          <!-- <span>{{scope.row.level + 11}}</span> -->
        </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { getRightsList } from '@/api'
export default {
  data () {
    return {
      rightsList: []
    }
  },
  methods: {
    init () {
      getRightsList('list').then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.rightsList = res.data
        } else {
          this.$message({
            message: '警告哦，这是一条警告消息',
            type: 'warning'
          })
        }
      })
    }
  },
  mounted () {
    this.init()
  },
  // 过滤器
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
