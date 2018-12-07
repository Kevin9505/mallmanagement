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
import { getCateData, addCate } from '@/api'
export default {
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
      // 分类数据
      cateList: [],
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
        console.log(res)
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
        this.addCateForm.cat_pid = value.join(',')
      } else if (value.length === 2) {
        this.addCateForm.cat_level = '2'
        this.addCateForm.cat_pid = value.join(',')
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
            if (res.meta.status === 200) {
              this.$message.success(res.meta.msg)
              this.addCatePicdialogFormVisible = false
            } else {
              this.$message.success(res.meta.msg)
            }
          })
        } else {
          this.$message.error('错了哦，请检查是否输入有为空哦。')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
