<template>
  <div class="goods">
    <el-form
      :inline="true"
      :label-position="'left'"
      :model="form"
      size="mini"
      class="flex-main-start"
    >
      <el-form-item label="商品名称">
        <el-input v-model="form.goodsName" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="left-20" type="primary" @click="onSubmit"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>
    <el-divider direction="horizontal"></el-divider>
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名" width="180"></el-table-column>
      <el-table-column
        prop="goodsType"
        label="商品类型"
        width="180"
      ></el-table-column>
      <el-table-column prop="price" label="结算价"> </el-table-column>
      <el-table-column prop="sale" label="已售"> </el-table-column>
      <el-table-column prop="create_at" label="创建时间"> </el-table-column>
    </el-table>
    <div class="block top-20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>
<style lang="scss">
.goods {
  background: white;
  min-height: 300px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>

<script>
// @ is an alias to /src

export default {
  name: "goods",
  data: function() {
    return {
      form: { goodsName: "" },
      currentPage3: 5,
      list: [
        {
          name: "麻辣鱼",
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
  methods: {
    onSubmit() {
      console.log("11");
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
