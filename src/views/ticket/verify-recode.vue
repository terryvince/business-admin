<template>
  <div class="check-recorder">
    <el-form
      :inline="true"
      :label-position="'left'"
      :model="search"
      size="mini"
      class="flex-main-start"
    >
      <el-form-item>
        <el-input v-model="search.goodsName" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="核销时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="search.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="search.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button class="left-20" type="primary" @click="onSubmit">搜索</el-button>
        <el-button class="left-20" type="primary" @click="onSubmit">导出到Excel</el-button>
      </el-form-item>
    </el-form>
    <el-divider direction="horizontal"></el-divider>
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goodsType" label="核销码" width="100"></el-table-column>
      <el-table-column prop="price" label="核销人" width="180"></el-table-column>
      <el-table-column prop="sale" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="create_at" label="核销时间" width="180"></el-table-column>
      <el-table-column prop="create_at" label="核销码有效期"></el-table-column>
      <el-table-column prop="create_at" label="所属订单" ></el-table-column>
    </el-table>
    <div class="block top-20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="size"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<style lang="scss">
.check-recorder {
  background: white;
  min-height: 300px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>

<script>
import { verifyList } from "@/servers/request";

export default {
  name: "checkRecorder",
  data: function() {
    return {
      search: { goodsName: "", goodsType: "", date1: "", date2: "" },
      currentPage3: 5,
      page: 1,
      size: 10,
      total: 0,
      list: [
        {
          col1: "麻辣鱼",
          goodsType: "物流商品",
          price: "96.00",
          sale: "200",
          create_at: "2019-11-18 17:08:52"
        },
        {
          name: "麻辣鱼",
          goodsType: "物流商品",
          price: "96.00",
          sale: "200",
          create_at: "2019-11-18 17:08:52"
        }
      ]
    };
  },
  components: {},
  created() {
    this.getList();
  },
  methods: {
    onSubmit() {
      console.log("11");
    },
    getList() {
      verifyList(this.page, this.size, this.search).then(response => {
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
