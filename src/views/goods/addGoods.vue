<template>
  <div class="addGoods">
    <el-card class="box-card">
      <!-- 进度条 -->
      <el-steps
        :active="active-0"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏 -->
      <template>
        <el-tabs
          style="margin-top:30px;"
          v-model="active"
          @tab-click="handleClick"
          tab-position="left"
        >
          <el-tab-pane
            label="基本信息"
            name="0"
          >
            <el-form
              :model="addGoodData"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="商品名称"
                prop="goods_name"
              >
                <el-input v-model="addGoodData.goods_name"></el-input>
              </el-form-item>
              <el-form-item
                label="商品价格"
                prop="goods_price"
              >
                <el-input v-model="addGoodData.goods_price"></el-input>
              </el-form-item>
              <el-form-item
                label="商品重量"
                prop="goods_weight"
              >
                <el-input v-model="addGoodData.goods_weight"></el-input>
              </el-form-item>
              <el-form-item
                label="商品数量"
                prop="goods_number"
              >
                <el-input
                  type="number"
                  v-model="addGoodData.goods_number"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="商品分类"
                prop="goods_cat"
              >
                <el-cascader
                  :clearable=true
                  :options="cateListData"
                  v-model="selectedCate"
                  @change="handleChange"
                  :props="cateProps"
                >
                </el-cascader>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label="商品参数"
            name="1"
          >商品参数</el-tab-pane>
          <el-tab-pane
            label="商品属性"
            name="2"
          >商品属性</el-tab-pane>
          <el-tab-pane
            label="商品图片"
            name="3"
          >
            <el-upload
              :headers="getToken()"
              class="upload-demo"
              action="http://localhost:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              :before-upload="handleUploadBefore"
              list-type="picture"
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <!-- 图片预览提示框 -->
            <el-dialog
              title="图片预览"
              :visible.sync="catePicdialogFormVisible"
            >
              <img
                :src="uerPicSrc"
                alt=""
              >
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane
            label="商品内容"
            name="4"
          >商品内容</el-tab-pane>
        </el-tabs>
      </template>
      <el-button
        type="primary"
        style="float:right;margin-top:10px;"
        plain
      >确认添加</el-button>
    </el-card>
  </div>
</template>
<script>
import { getCateData } from '@/api'
export default {
  data () {
    return {
      active: '0',
      catePicdialogFormVisible: false,
      // 添加商品数据
      addGoodData: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      // 上传图片
      fileList: [],
      // 预览图片
      uerPicSrc: '',
      // 下拉框
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 分类数据
      cateListData: [],
      selectedCate: [],
      // 验证规则
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_cat: [{ required: true, message: '请输入分类', trigger: 'blur' }],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取token
    getToken () {
      const token = sessionStorage.getItem('userToken')
      return {'Authorization': token}
    },
    // 获取商品分类数据
    init () {
      getCateData().then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.cateListData = res.data
        }
      })
    },
    // tab栏
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    // 分类
    handleChange (value) {
      console.log(value)
    },
    // 移除图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 预览图片
    handlePreview (file) {
      console.log(file.response.data.tmp_path)
      this.uerPicSrc = 'http://localhost:8888/' + file.response.data.tmp_path
      console.log(this.uerPicSrc)
      this.catePicdialogFormVisible = true
    },
    // 上传成功
    handleSuccess (response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
    },
    // 图片上传之前
    handleUploadBefore (file) {}
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  padding: 20px;
}
</style>
