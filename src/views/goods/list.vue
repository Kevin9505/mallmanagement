<template>
  <div class="list">
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <template>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          style="width:300px;"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchGoodsByQuery"
          ></el-button>
        </el-input>
        <!-- <el-input
          placeholder="请输入对应商品id"
          v-model="goods_id"
          class="input-with-select"
          style="width:300px;"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchGoodsById"
          ></el-button>
        </el-input> -->
        <el-button
          type="success"
          plain
          @click="$router.push('addGoods')"
        >添加商品</el-button>
      </template>
      <!-- 商品列表 -->
      <template>
        <el-table
          :data="listData"
          border
          style="width: 100%;margin-top: 30px;"
        >
          <el-table-column
            type="index"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
          >
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品价格(元)"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="goods_weight"
            label="商品重量"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="upd_time"
            label="创建时间"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页器 -->
      <el-pagination
        style="margin-top:30px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagesize"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { getListData, deleteGoodById } from '@/api'

export default {
  data () {
    return {
      goods_id: '',
      query: '',
      pagenum: 1,
      pagesize: 10,
      total: 5,
      listData: []
    }
  },
  methods: {
    // 页面初始化数据
    init () {
      getListData({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.listData = res.data.goods
          // console.log(this.listData)
          this.total = res.data.total
        }
      })
    },
    // 每页显示多少条
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    // 当前页码
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.init()
    },
    // 搜索对应的商品
    searchGoodsByQuery () {
      this.init()
    },
    // 根据商品id查询对应的商品
    // searchGoodsById () {
    //   console.log(this.goods_id)
    //   searchGoodsById(this.goods_id).then(res => {
    //     console.log(res)
    //     if (res.meta.status === 200) {
    //       this.listData = res.data
    //       console.log(this.listData)
    //     } else {
    //       this.$message.error(res.meta.msg)
    //     }
    //   })
    // },
    // 根据商品id删除商品
    handleDelete (data) {
      deleteGoodById(data.goods_id).then(res => {
        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg)
          this.init()
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
