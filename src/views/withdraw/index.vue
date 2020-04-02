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
        <span>可申请提现金额：{{withdraw_data.sum_amount}}</span>
        <el-button class="left-20" type="primary" @click="withdrawAmount">申请提现</el-button>
      </el-form-item>
      <el-form-item class="left-20">
        <el-select v-model="form.status" placeholder="提现状态">
          <el-option label="--请选择--" value></el-option>
          <el-option label="审核未通过" value="-1"></el-option>
          <el-option label="待审核" value="1"></el-option>
          <el-option label="已打款" value="2"></el-option>
          <el-option label="等待财务打款" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="left-20" type="primary" @click="getWithdrawList">搜索</el-button>
        <el-button class="left-20" type="primary" @click="getWithdrawList">导出到Excel</el-button>
      </el-form-item>
    </el-form>
    <el-divider direction="horizontal"></el-divider>
    <el-table
      v-loading="location"
      element-loadinf-text="正在拼命加载"
      :data="list"
      border
      style="width: 100%"
    >
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="w_amount" label="申请提现金额" width="180"></el-table-column>
      <el-table-column prop="w_rate" label="费率"></el-table-column>
      <el-table-column prop="rate_price" label="手续费"></el-table-column>
      <el-table-column prop="w_real_amount" label="实际结算金额"></el-table-column>
      <el-table-column prop="w_status" label="提现状态"></el-table-column>
      <el-table-column prop="w_create_time" label="申请时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary" @click="clickWithdrawProduct(scope.row.w_id)">提现产品</el-link>
          <el-link
            style="margin-left:10px"
            type="primary"
            @click="withdrawDetail(scope.row.w_id)"
          >查看详情</el-link>
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
      ></el-pagination>
    </div>
    <!-- 查看提现产品 -->
    <el-dialog title="提现产品" :visible.sync="dialogTableVisible">
      <el-table v-loading="location_product" :data="gridData">
        <el-table-column property="g_name" label="商品名称" width="150"></el-table-column>
        <el-table-column property="tv_code" label="核销码" width="80"></el-table-column>
        <el-table-column property="tv_createtime" label="核销/发货时间"></el-table-column>
        <el-table-column property="tv_price" label="结算价格"></el-table-column>
        <el-table-column property="ver_name" label="核销人/发货人"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 查看提现详情 -->
    <el-dialog title="提现详情" :visible.sync="dialogWithdrawDetail" width="500px">
      <el-form class="width_detail" label-width="120px">
        <el-form-item label="id：">
          <span>{{detailData.w_id}}</span>
        </el-form-item>
        <el-form-item label="提现金额：">
          <span>{{detailData.w_amount}}</span>
        </el-form-item>
        <el-form-item label="实际结算金额：">
          <span>{{detailData.rest_amount}}</span>
        </el-form-item>
        <el-form-item label="申请提现时间：">
          <span>{{detailData.w_create_time}}</span>
        </el-form-item>
        <el-form-item label="审核时间：">
          <span>{{detailData.w_update_time}}</span>
        </el-form-item>
        <el-form-item label="提现银行账号：">
          <span>{{detailData.w_account_number}}</span>
        </el-form-item>
        <el-form-item label="持卡人姓名：">
          <span>{{detailData.w_account_member}}</span>
        </el-form-item>

        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in detailData.log_list"
            :key="index"
            icon="#0bbd87"
            type="primary"
            color="#0bbd87"
            size="large"
            :timestamp="item.create_time"
          >
            <div>
              <p>{{index == 0 ? '运营审核意见' : '财务审核意见'}} : {{index == 0 ? detailData.w_operative_status_txt : detailData.w_finance_status_txt}}</p>
              <p>备注： {{item.remark_json}}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-form>
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
.width_detail span {
  float: left;
  text-align: left;
}
.width_detail .el-form-item {
  margin: 0;
}
.width_detail p {
  text-align: left;
  color: #606266;
}
.el-timeline-item__timestamp {
  color: #606266;
  text-align: left;
}
</style>

<script>
import {
  withdrawList,
  withdrawApply,
  withdrawProduct,
  withdrawDetail
} from "@/servers/request";
export default {
  name: "withdraw",
  data: function() {
    return {
      form: { status: "" },
      page: 1,
      size: 10,
      total: 0,
      list: [],
      location: false,
      location_product: false,

      withdraw_data: [],
      gridData: [],
      dialogTableVisible: false,
      dialogWithdrawDetail: false,
      detailData: {}
    };
  },
  created() {
    this.getWithdrawList();
  },
  components: {},
  methods: {
    // 申请列表
    getWithdrawList() {
      this.location = true;
      this.form.page = this.page;
      this.form.page_size = this.size;
      withdrawList(this.form).then(response => {
        this.location = false;
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return false;
        }
        this.list = resp.data.list;
        this.page = resp.data.page;
        this.withdraw_data = resp.data.withdraw_info;
        this.total = parseInt(resp.data.count);
      });
    },
    // 申请提现
    withdrawAmount() {
      this.$confirm(
        "确定要申请提现" +
          this.withdraw_data.sum_amount +
          "吗？本次手续费" +
          this.withdraw_data.rate +
          "%（" +
          this.withdraw_data.rate_price +
          "），实际到账" +
          this.withdraw_data.real_amount,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          withdrawApply({}).then(response => {
            const resp = response.data;
            if (resp.ec !== 200) {
              this.$message.error(resp.em);
              return false;
            } else {
              this.$message({
                type: "success",
                message: "提现成功!"
              });
              this.getWithdrawList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 提现产品
    clickWithdrawProduct(e) {
      this.dialogTableVisible = true;
      this.location_product = true;
      withdrawProduct({ w_id: e }).then(response => {
        const resp = response.data;
        this.location_product = false;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return false;
        }
        this.gridData = resp.data.list;
      });
    },
    withdrawDetail(id) {
      withdrawDetail(id).then(response => {
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return false;
        }
        this.dialogWithdrawDetail = true;
        this.detailData = resp.data;
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
