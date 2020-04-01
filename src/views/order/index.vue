<template>
  <div class="order">
    <el-form
      :inline="true"
      :label-position="'left'"
      :model="form"
      size="mini"
      class="flex-main-start"
    >
      <el-form-item>
        <el-input v-model="form.goodsName" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.region" placeholder="请选择商品类型">
          <el-option label="物流商品" value="shanghai"></el-option>
          <el-option label="核销商品" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.goodsName" placeholder="订单号/手机号/昵称/姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.region" placeholder="订单状态">
          <el-option label="待发货" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button class="left-20" type="primary" @click="onSubmit">搜索</el-button>
        <el-button class="left-20" type="primary" @click="onSubmit">导出到Excel</el-button>
      </el-form-item>
    </el-form>
    <el-divider direction="horizontal"></el-divider>
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="t_tid" label="订单号"></el-table-column>
      <el-table-column prop="to_title" label="订单商品" width="180"></el-table-column>
      <el-table-column prop="goods_type_txt" label="商品类型" width="180"></el-table-column>
      <el-table-column label="序号">
        <template slot-scope="scope">
          <div>
            <span>
              {{ scope.row.ticket_valid }}/已核销{{
              scope.row.ticket_used
              }}剩余{{ scope.row.ticket_valid }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="g_seller_price" label="结算价"></el-table-column>
      <el-table-column>
      <template slot-scope="scope">
          <div>
            <p>昵称: {{scope.row.t_buyer_nick}} </p>
            <p>电话: {{scope.row.ma_phone}} </p>
            <p>地址: {{scope.row.g_verify_type == 'code' ? '无需地址' : scope.row.t_address_ext}} </p>
            
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="t_note" label="备注"></el-table-column>
      <el-table-column prop="t_pay_time" label="支付时间"></el-table-column>
      <el-table-column prop="t_status_txt" label="已售"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-link v-if="scope.row.g_verify_type == 'ship'" type="primary">发货</el-link>
            <el-link v-if="scope.row.g_verify_type == 'ship'" type="primary" style="margin-left:10px">修改收货信息</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block top-20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<style lang="scss">
.order {
  background: white;
  min-height: 300px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>

<script>
import { orderList } from "@/servers/request";
export default {
  name: "order",
  data: function() {
    return {
      form: { goodsName: "", goodsType: "", date1: "", date2: "" },
      currentPage3: 5,
      list: [],
      search: {}
    };
  },
  created() {
    this.getList();
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
    },
    getList() {
      orderList(this.search).then(response => {
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.data.em);
          return false;
        }
        this.list = resp.data.list;
        console.log(this.list);
      });
    }
  }
};
</script>
