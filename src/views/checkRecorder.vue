<template>
  <div class="check-recorder">
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
      <el-form-item label="核销时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 100%;"
          ></el-time-picker>
        </el-col>
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
.check-recorder {
  background: white;
  min-height: 300px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>

<script>
// @ is an alias to /src

export default {
  name: 'checkRecorder',
  data: function() {
    return {
      form: { goodsName: '', goodsType: '', date1: '', date2: '' },
      currentPage3: 5,
      list: [
        {
          col1: '麻辣鱼',
          goodsType: '物流商品',
          price: '96.00',
          sale: '200',
          create_at: '2019-11-18 17:08:52'
        },
        {
          name: '麻辣鱼',
          goodsType: '物流商品',
          price: '96.00',
          sale: '200',
          create_at: '2019-11-18 17:08:52'
        }
      ]
    };
  },
  components: {},
  created() {
    // this.$store.commit("updateLoading", true);//触发加载状态
  },
  mounted() {
    // this.$store.commit("updateLoading", false);//关闭加载状态
  },
  methods: {
    onSubmit() {
      console.log('11');
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
