<template>
  <div class="withdraw">
    <el-form
      :inline="true"
      :label-position="'left'"
      :model="form"
      size="mini"
      class="flex-main-start"
    >
      <el-form-item>
        <span>可申请提现金额：1800.00</span>
        <el-button class="left-20" type="primary" @click="withdrawAmount"
          >申请提现</el-button
        >
      </el-form-item>
      <el-form-item class="left-20">
        <el-select v-model="form.status" placeholder="提现状态">
          <el-option label="审核未通过" value="-1"></el-option>
          <el-option label="待审核" value="1"></el-option>
          <el-option label="已打款" value="2"></el-option>
          <el-option label="等待财务打款" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="left-20" type="primary" @click="onSubmit"
          >搜索</el-button
        >
        <el-button class="left-20" type="primary" @click="onSubmit"
          >导出到Excel</el-button
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
      <el-table-column prop="w_amount" label="申请提现金额" width="180"></el-table-column>
      <el-table-column prop="w_rate" label="费率"> </el-table-column>
      <el-table-column prop="rate_price" label="手续费"> </el-table-column>
      <el-table-column prop="w_real_amount" label="实际结算金额"> </el-table-column>
      <el-table-column prop="w_status" label="提现状态"> </el-table-column>
      <el-table-column prop="w_create_time" label="申请时间"> </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-link type="primary"
                   @click="dialogTableVisible = true"
                  >提现产品</el-link>
          <el-link   style="margin-left:10px" type="primary"> 查看详情</el-link >
        </template>
      </el-table-column>
    </el-table>
    <div class="block top-20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="10"
        :page-sizes="[10,20,50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 查看详情弹框 -->
    <el-dialog title="提现产品" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="商品名称"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="核销码"
          width="80"
        ></el-table-column>
        <el-table-column property="address" label="核销/发货时间"></el-table-column>
        <el-table-column property="address" label="结算价格"></el-table-column>
        <el-table-column property="address" label="核销人/发货人"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.withdraw {
  background: white;
  min-height: 300px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>

<script>
import {withdrawList} from "@/servers/request";
export default {
  name: "withdraw",
  data: function() {
    return {
      form: { status: ""},
      page: 1,
      size: 10,
      total: 0,
      list: [],
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogTableVisible: false
    };
  },
  created() {
    this.getWithdrawList();
  },
  components: {},
  methods: {
    getWithdrawList() {
      this.form.page = this.page;
      this.form.page_siz = this.size;
      withdrawList(this.form).then(response => {
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return false;
        }
        this.list = resp.data.list;
        this.page = resp.data.page;
        this.total = parseInt(resp.data.count);
      });
    },
    // 申请提现
    withdrawAmount() {
      this.$confirm(
        "确定要申请提现1800.00吗？本次手续费千分之七（12.6），实际到账1787.4",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "提现成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleSizeChange(val) {
      this.page = 1;
      this.size = val;
      this.getWithdrawList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getWithdrawList();
    }
  }
};
</script>
