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
        <el-input v-model="form.keyword" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.type" placeholder="请选择商品类型">
          <el-option label="物流商品" value="ship"></el-option>
          <el-option label="核销商品" value="code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.phone" placeholder="订单号/手机号/昵称/姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.status" placeholder="订单状态">
          <el-option
            v-for="item in orderStatus"
            :key="item.type"
            :value="item.type"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.timeRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="left-20" type="primary" @click="onSubmit">搜索</el-button>
        <el-button class="left-20" type="primary" @click="onSubmit">导出到Excel</el-button>
      </el-form-item>
    </el-form>
    <el-divider direction="horizontal"></el-divider>
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="序号" width="50px">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="t_tid" label="订单号" width="200px"></el-table-column>
      <el-table-column prop="to_title" label="订单商品" width="180px"></el-table-column>
      <el-table-column prop="goods_type_txt" label="商品类型" width="90"></el-table-column>
      <el-table-column label="商品数量/核销码"  width="140">
        <template slot-scope="scope">
          <div>
            <span>
              <p>核销剩余:{{ scope.row.ticket_valid }}</p>
              <p>已被核销:{{scope.row.ticket_used}}</p>
              <p>商品数量:{{scope.row.to_num}}</p>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="g_seller_price" label="结算价" width="100"></el-table-column>
      <el-table-column  label="收货信息">
        <template slot-scope="scope">
          <div>
            <p>昵称: {{scope.row.t_buyer_nick}}</p>
            <p>电话: {{scope.row.ma_phone}}</p>
            <p>地址: {{scope.row.g_verify_type == 'code' ? '无需地址' : scope.row.t_address_ext}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="t_note" label="备注"></el-table-column>
      <el-table-column prop="t_pay_time" label="支付时间"></el-table-column>
      <el-table-column prop="t_status_txt" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-link v-if="scope.row.g_verify_type == 'ship'" type="primary">发货</el-link>
            <el-link
              v-if="scope.row.g_verify_type == 'ship'"
              type="primary"
              style="margin-left:10px"
            >修改收货信息</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block top-20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
p {
  margin: 0;
  padding: 0;
}
</style>

<script>
const orderStatus = [
  { type: "wait_send", name: "待发货" },
  { type: "wait_use", name: "待核销" },
  { type: "send", name: "已发货" },
  { type: "confirm", name: "已收货" },
  { type: "complete", name: "已完成" }
];
import { orderList } from "@/servers/request";
export default {
  name: "order",
  data: function() {
    return {
      form: {
        keyword: "",
        type: "",
        timeRange: "",
        status: "",
        phone: ""
      },
      total: 0,
      page: 1,
      size: 10,
      list: [],
      orderStatus,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  components: {},
  methods: {
    onSubmit() {
      this.getList();
    },
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    getList() {
      orderList(this.page, this.size, this.form).then(response => {
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return false;
        }
        this.list = resp.data.list;
        this.total = resp.data.count;
      });
    }
  }
};
</script>
