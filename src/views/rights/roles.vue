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
        @click="addGrantDialogFormVisible=true"
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
                @click="handleGrantRoles(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 授权角色弹框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="grantdialogFormVisible"
    >
      <!-- default-expanded-keys 默认展开节点  default-checked-keys 默认选中点 -->
      <div class="box">
        <el-tree
          ref="tree"
          :data="grantRolesTreeData"
          show-checkbox
          node-key="id"
          :default-checked-keys="defaultcheckedkeys"
          :props="defaultProps"
          :default-expand-all="true"
        >
        </el-tree>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="grantRolesSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addGrantDialogFormVisible"
    >
      <el-form :model="addGrantRoles" :label-width="formLabelWidth">
        <el-form-item
          label="角色名称"
        >
          <el-input
            v-model="addGrantRoles.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
        >
          <el-input
            v-model="addGrantRoles.roleDesc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addGrantDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserRolesList, getGrantList, grantRolesById } from '@/api'

export default {
  data () {
    return {
      rolesdialogFormVisible: false,
      grantdialogFormVisible: false,
      addGrantDialogFormVisible: false,
      // 角色列表数据
      rolesListData: [],
      // 分配权限数据
      grantRolesTreeData: [],
      // 默认选中的节点
      defaultcheckedkeys: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: '',
      addGrantRoles: {
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    // 页面数据渲染
    init () {
      getUserRolesList().then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.rolesListData = res.data
        }
      })
    },
    // 分配权限数据的展示
    handleGrantRoles (data) {
      // console.log(data)
      this.roleId = data.id
      this.grantdialogFormVisible = true
      getGrantList().then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.grantRolesTreeData = res.data
        }
      })
      // 在获取当前角色的权限时,先清空
      this.defaultcheckedkeys.length = 0
      // 获取当前角色的所有权限
      data.children.forEach((first, index) => {
        // 判断是否存在且长度大于0
        if (first.children && first.children.length !== 0) {
          first.children.forEach((second, index) => {
            if (second.children && second.children.length !== 0) {
              second.children.forEach((third, index) => {
                this.defaultcheckedkeys.push(third.id)
              })
            }
          })
        }
      })
    },
    // 角色分配权限
    grantRolesSubmit () {
      var checkNode = this.$refs.tree.getCheckedNodes()
      var checkNodeId = checkNode.map((item, index) => {
        return item.id + ',' + item.pid
      })
      var joinStr = checkNodeId.join(',')
      var setStr = Array.from(new Set(joinStr.split(',')))
      var finaRid = setStr.join(',')
      // console.log(this.roleId)
      grantRolesById(this.roleId, finaRid).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
          this.grantdialogFormVisible = false
        } else {
          this.$message({
            message: res.meta.msg,
            type: 'error'
          })
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
.roles {
}
.box {
  height: 280px;
  overflow: auto;
}
</style>
