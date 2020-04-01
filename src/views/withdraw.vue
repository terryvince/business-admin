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
        <el-button class="left-20" type="primary" @click="onSubmit"
          >申请提现</el-button
        >
      </el-form-item>
      <el-form-item class="left-20">
        <el-select v-model="form.region" placeholder="提现状态">
          <el-option label="待审核" value="shanghai"></el-option>
          <el-option label="已打款" value="beijing"></el-option>
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
      <el-table-column prop="name" label="商品名" width="180"></el-table-column>
      <el-table-column
        prop="goodsType"
        label="商品类型"
        width="180"
      ></el-table-column>
      <el-table-column prop="price" label="结算价"> </el-table-column>
      <el-table-column prop="sale" label="已售"> </el-table-column>
      <el-table-column prop="create_at" label="创建时间"> </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-link @click="withdrawProduct" type="primary">提现产品</el-link>
          <el-link
            type="primary"
            @click="dialogTableVisible = true"
            style="margin-left:10px"
            >查看详情</el-link
          >
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
      >
      </el-pagination>
    </div>
    <!-- 查看详情弹框 -->
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
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
// @ is an alias to /src

export default {
  name: "withdraw",
  data: function() {
    return {
      form: { goodsName: "", goodsType: "", date1: "", date2: "" },
      currentPage3: 5,
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
      ],
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
  components: {},
  methods: {
    withdrawProduct() {
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
