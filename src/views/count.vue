<template>
  <div>
    <div class="count flex-main-start" style="margin-bottom:15px">
      <div class="count-block box-shadow flex-main-start flex-column">
        <p>已提现 :￥{{withdraw}}</p>
      </div>
      <div class="count-block box-shadow flex-main-start flex-column">
        <p>可提现 :￥{{withdraw_able}}</p>
      </div>
      <router-link :to="'withdraw'" >立即提现</router-link>
    </div>
    <div>
      <el-form
        :inline="true"
        :label-position="'left'"
        :model="form"
        size="mini"
        class="flex-main-start flex-wrap"
      >
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
        </el-form-item>
      </el-form>
      <el-table :data="list" height="600" style="width: 100%;text-align:center;">
        <el-table-column type="index" label="序号" width="100px"></el-table-column>
        <el-table-column prop="g_name" label="商品" width="350px"></el-table-column>
        <el-table-column prop="sum_num" width="100px" label="销量"></el-table-column>
        <el-table-column prop="sum_total" label="总金额"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 50]"
          :page-size="10"
          layout="total,  prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.count-block {
  width: 180px;
  height: 40px;
  background: white;
  margin-right: 30px;
  border-radius: 10px;
  p {
    margin: 0;
    padding: 0;
    line-height: 40px;
  }
}
</style>
<script>
import { withdrawCount, merchantSellList } from "@/servers/request";
export default {
  name: "count",
  components: {},
  data() {
    return {
      total: 0,
      page: 1,
      size: 15,
      withdraw: 0,
      withdraw_able: 0,
      list: [],
      form: {
        timeRange: ""
      }
    };
  },
  created() {
    this.getList();
    this.getWithdraw();
  },
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
      merchantSellList(this.page, this.size, this.form).then(response => {
        var resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return false;
        }
        this.list = resp.data.list;
        this.total = resp.data.count
      });
    },
    getWithdraw() {
      withdrawCount().then(response => {
        var resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return false;
        }

        this.withdraw = resp.data.withdraw_total;
        this.withdraw_able = resp.data.withdraw_able;
      });
    }
  }
};
</script>
