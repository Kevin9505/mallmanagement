<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
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
        @click="adddialogFormVisible=true"
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
                @change="changeUserState(scope.row)"
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
                content="授权"
                placement="top"
              >
                <el-button
                  plain
                  type="success"
                  class="el-icon-check"
                  @click="handleImpower(scope.$index, scope.row)"
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
      :page-sizes="[5, 10, 15, 20]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="adddialogFormVisible"
    >
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        :label-width="formLabelWidth"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="addForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="addForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="addForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="mobile"
        >
          <el-input
            v-model="addForm.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="resetForm ('addForm')">取 消</el-button>
        <el-button
          type="primary"
          @click="addUserForm ('addForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户信息 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editdialogFormVisible"
    >
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        :label-width="formLabelWidth"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="editForm.username"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="editForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="mobile"
        >
          <el-input
            v-model="editForm.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editdialogFormVisible=!editdialogFormVisible">取 消</el-button>
        <el-button
          type="primary"
          @click="editUserForm ('editForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUserList,
  addUser,
  editUser,
  deleteUser,
  changeUserState
} from '@/api/index'

export default {
  data () {
    return {
      total: 0,
      // 用户信息
      userInfo: [],
      userstatus: '',
      params: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      // 控制添加提示框的显示
      adddialogFormVisible: false,
      // 控制添加提示框的显示
      editdialogFormVisible: false,
      // 添加用户数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户数据
      editForm: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px',
      // 验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            type: 'email',
            required: true,
            message: '请输入正确的邮箱',
            trigger: 'blur, change'
          }
        ],
        mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 获取用户信息
    init () {
      getUserList(this.params).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.userInfo = res.data.users
          this.total = res.data.total
        }
      })
    },
    // 每页显示多少条
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.params.pagesize = val
      // console.log(this.params)
      this.init()
    },
    // 显示当前页
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.params.pagenum = val
      // console.log(this.params)
      this.init()
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.adddialogFormVisible = false
    },
    // 添加用户
    addUserForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addUser(this.addForm).then(res => {
            console.log(res)
            if (res.meta.status === 201) {
              this.adddialogFormVisible = false
              this.$refs[formName].resetFields()
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              this.init()
            } else {
              this.$message.error(res.meta.msg)
              return false
            }
          })
        } else {
          this.$message.error('输入信息有误,请检查!!!')
          return false
        }
      })
    },
    // 编辑用户
    handleEdit (data) {
      this.editdialogFormVisible = true
      console.log(data)
      this.editForm.id = data.id
      this.editForm.username = data.username
      this.editForm.mobile = data.mobile
      this.editForm.email = data.email
    },
    editUserForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.editForm)
          editUser(this.editForm).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              this.editdialogFormVisible = false
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              this.init()
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
            }
          })
        } else {
          this.$message.error('输入信息有误,请检查!!!')
          return false
        }
      })
    },
    // 删除用户
    handleDelete (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUser(id).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              this.init()
            } else {
              this.$message({
                message: res.meta.msg,
                type: 'error'
              })
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改用户状态
    changeUserState (data) {
      console.log(data)
      changeUserState(data.id, data.mg_state).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
          this.init()
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
          this.init()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
