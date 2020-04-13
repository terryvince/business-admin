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
        <el-input v-model="search.keyword" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="核销时间">
        <el-date-picker
          v-model="search.timeRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="left-20" type="primary" @click="onSubmit"
          >搜索</el-button
        >
        <el-button class="left-20" type="primary" @click="exportExcel"
          >导出到Excel</el-button
        >
      </el-form-item>
    </el-form>
    <el-divider direction="horizontal"></el-divider>
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="g_name"
        label="商品名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="tv_code"
        label="核销码"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="ms_name"
        label="核销人"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="gt_createtime"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="verify_time"
        label="核销时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="time_between"
        label="核销码有效期"
      ></el-table-column>
      <el-table-column prop="t_tid" label="所属订单"></el-table-column>
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
import { export_json_to_excel } from "@/assets/Export2Excel.js";
export default {
  name: "checkRecorder",
  data: function() {
    return {
      search: { keyword: "", timeRange: "" },
      page: 1,
      size: 10,
      total: 0,
      list: [],
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
  components: {},
  created() {
    this.getList();
  },
  methods: {
    exportExcel() {
      const tHeader = [
        "商品名称",
        "核销码",
        "核销人",
        "创建时间",
        "核销时间",
        "核销码有效期",
        "所属订单"
      ]; //excel表头
      const data = this.formatJson(this.list);
      console.log(export_json_to_excel);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: +new Date() + this.$route.meta.title,
        autoWidth: true,
        bookType: "xlsx"
      });
    },

    formatJson(jsonData) {
      return jsonData.map(v => {
        let arr = [];
        arr.push(v.g_name);
        arr.push(v.tv_code);
        arr.push(v.ms_name);
        arr.push(v.gt_createtime);
        arr.push(v.verify_time);
        arr.push(v.time_between);
        arr.push(v.t_tid);
        return arr;
      });
    },
    onSubmit() {
      this.getList();
    },
    getList() {
      verifyList(this.page, this.size, this.search).then(response => {
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return;
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
