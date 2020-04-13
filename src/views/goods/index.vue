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
        <el-input v-model="form.keyword" placeholder="商品名称"></el-input>
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
      <el-table-column prop="g_name" label="商品名" width="180" ></el-table-column>
      <el-table-column  prop="g_cover"  label="图片" width="180"  >
        <template slot-scope="scope">
          <img :src="scope.row.g_cover" width="100" height="100"/>
        </template>
      </el-table-column>
      <el-table-column label="商品类型" width="180">
        <template slot-scope="scope">
          <span>{{
            scope.row.g_verify_type == "code" ? "核销商品" : "物流商品"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="结算价">
        <template slot-scope="scope">
          <span>总结算价：{{scope.row.g_seller_price}} </span><br/>
          <span>总需要核销两次：（{{scope.row.g_create_ticket_num}}）</span>
        </template>
      </el-table-column>
      <el-table-column prop="g_sold" label="已售"></el-table-column>
      <el-table-column prop="g_create_day" label="创建时间"></el-table-column>
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
.goods {
  background: white;
  min-height: 300px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>

<script>
import { goodsList } from "@/servers/request";
export default {
  name: "goods",
  data: function() {
    return {
      form: { name: "" },
      page: 1,
      size: 10,
      total: 0,
      list: []
    };
  },
  components: {},
  created() {
    this.getList();
  },
  methods: {
    onSubmit() {
      this.getList();
    },

    getList() {
      goodsList(this.page, this.size, this.form).then(response => {
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return false;
        }
        this.list = resp.data.list;
        this.total = resp.data.count;
      });
    },
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    }
  }
};
</script>
