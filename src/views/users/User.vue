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
          @click="init"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <el-button
        type="success"
        plain
        @click="dialogFormVisible=true"
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
                  @click="handleEdit(scope.$index, scope.row)"
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
                  @click="handleImpower(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="授权"
                placement="top"
              >
                <el-button
                  plain
                  type="success"
                  class="el-icon-check"
                  @click="handleDelete(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 15px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户 -->
    <div>
      <el-dialog
        title="添加用户"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          :model="form"
          :label-width="formLabelWidth"
        >
          <el-form-item label="用户名">
            <el-input
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input
              v-model="form.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogFormVisible = false"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getUserList } from '@/api/index'

export default {
  data () {
    return {
      total: 0,
      userInfo: [],
      userstatus: '',
      params: {
        query: '',
        pagenum: 1,
        pagesize: 1
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getUserList(this.params).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.userInfo = res.data.users
          this.total = res.data.total
        }
      })
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.params.pagesize = val
      console.log(this.params)
      this.init()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.params.pagenum = val
      console.log(this.params)
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
