<template>
  <div class="categories">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="success"
      plain
      @click="showAddCateDialog"
    >添加分类</el-button>
    <!-- 分类列表 -->
    <tree-grid
      style="margin-top:20px;"
      :treeStructure="true"
      :columns="columns"
      :data-source="cateListData"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
    <!-- 添加商品分类弹框 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="addCatePicdialogFormVisible"
    >
      <el-form
        :model="addCateForm"
        ref="addCateForm"
        :rules="rules"
        :label-width="formLabelWidth"
      >
        <el-form-item
          label="分类名称"
          prop="cat_name"
        >
          <el-input
            v-model="addCateForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            :options="cateList"
            v-model="CateSelectedOptions"
            :props='cateOptions'
            :change-on-select="true"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addCatePicdialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCateSubmit('addCateForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCateData, addCate, deleteCate } from '@/api'
// 导入自定义组件
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
export default {
  // 组件的注册
  components: {
    TreeGrid
  },
  data () {
    return {
      // 输入框的宽度
      formLabelWidth: '120px',
      // 控制添加分类提示框的显示
      addCatePicdialogFormVisible: false,
      // 添加商品分类的数据
      addCateForm: {
        cat_pid: '0',
        cat_name: '',
        cat_level: '0'
      },
      // 分类列表的配置
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }],
      // 分类数据
      cateList: [],
      // 分类列表数据
      cateListData: [],
      // 父级分类配置项
      cateOptions: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 父级选中项
      CateSelectedOptions: [],
      // 验证规则
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 显示添加分类弹框
    showAddCateDialog () {
      getCateData(2).then(res => {
        this.addCatePicdialogFormVisible = true
        // console.log(res)
        if (res.meta.status === 200) {
          this.cateList = res.data
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    // 级联选择器选中值
    handleChange (value) {
      console.log(value)
      if (value.length === 1) {
        this.addCateForm.cat_level = '1'
        this.addCateForm.cat_pid = value[0]
      } else if (value.length === 2) {
        this.addCateForm.cat_level = '2'
        this.addCateForm.cat_pid = value[1]
      }
      // console.log(this.addCateForm.cat_pid)
    },
    // 确认添加分类
    addCateSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.addCateForm)
          addCate(this.addCateForm).then(res => {
            console.log(res)
            if (res.meta.status === 201) {
              this.$message.success(res.meta.msg)
              this.init()
              this.addCatePicdialogFormVisible = false
              this.$refs[formName].resetFields()
            } else {
              this.$message.error(res.meta.msg)
            }
          })
        } else {
          this.$message.error('错了哦，请检查是否输入有为空哦。')
        }
      })
    },
    // 获取分类列表数据
    init () {
      getCateData(3).then(res => {
        if (res.meta.status === 200) {
          // console.log(res)
          this.cateListData = res.data
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    // 删除分类
    deleteCategory (id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCate(id).then(res => {
          if (res.meta.status === 200) {
            this.$message.success(res.meta.msg)
            this.init()
          } else {
            this.$message.error(res.meta.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑分类
    editCategory () {}
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
</style>
