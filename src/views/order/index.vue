<template>
  <div class="order">
    <el-form
      :inline="true"
      :label-position="'left'"
      :model="form"
      size="mini"
      class="flex-main-start flex-wrap"
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
        <el-input
          v-model="form.phone"
          placeholder="订单号/手机号/昵称/姓名"
        ></el-input>
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
      <el-table-column label="序号" width="50px">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="t_tid"
        label="订单号"
        width="200px"
      ></el-table-column>
      <el-table-column
        prop="to_title"
        label="订单商品"
        width="180px"
      ></el-table-column>
      <el-table-column
        prop="goods_type_txt"
        label="商品类型"
        width="90"
      ></el-table-column>
      <el-table-column label="商品数量/核销码" width="140">
        <template slot-scope="scope">
          <div>
            <span>
              <p>核销剩余:{{ scope.row.ticket_valid }}</p>
              <p>已被核销:{{ scope.row.ticket_used }}</p>
              <p>商品数量:{{ scope.row.to_num }}</p>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="g_seller_price"
        label="结算价"
        width="100"
      ></el-table-column>
      <el-table-column label="收货信息">
        <template slot-scope="scope">
          <div>
            <p>昵称: {{ scope.row.t_buyer_nick }}</p>
            <p>电话: {{ scope.row.t_phone_ext }}</p>
            <p>
              地址:
              {{
                scope.row.g_verify_type == 'code'
                  ? '无需地址'
                  : scope.row.t_address_ext
              }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="t_note" label="备注"></el-table-column>
      <el-table-column prop="t_pay_time" label="支付时间"></el-table-column>
      <el-table-column prop="t_status_txt" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-link
              v-if="
                scope.row.g_verify_type == 'ship' && scope.row.t_status == 3 && scope.row.t_feedback == 0
              "
              @click="getShipping(scope.row.t_tid)"
              type="primary"
              >发货</el-link
            >
            <el-link
              v-if="
                scope.row.g_verify_type == 'ship' && scope.row.t_status == 4
              "
              type="primary"
              style="margin-left:10px"
              @click="showEditDialog(scope.row)"
              >修改收货信息</el-link
            >
            <el-link
              v-if="
                scope.row.g_verify_type == 'ship' && scope.row.t_status == 4
              "
              type="primary"
              style="margin-left:10px"
              @click="showShipping(scope.row)"
              >查看物流信息</el-link
            >
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
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 发货dialog -->
    <el-dialog title="发货" :visible.sync="shipping_dialog" width="30%" center>
      <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
        <el-form-item label="物流公司">
          <el-select v-model="dialogForm.company" placeholder="物流公司">
            <el-option
              v-for="(item, index) in shipping"
              :key="index"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号" prop="code">
          <el-input v-model="dialogForm.code" placeholder="物流单号"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="expressNote">
          <el-input
            v-model="dialogForm.expressNote"
            placeholder="备注信息"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shipping_dialog = false">关闭</el-button>
        <el-button type="primary" @click="submitShipping()">确认发货</el-button>
      </span>
    </el-dialog>
    <!-- 修改地址电话dialog -->
    <el-dialog
      title="修改收货信息"
      :visible.sync="edit_dialog"
      width="30%"
      center
    >
      <el-form ref="dialog_address" :model="dialog_address" label-width="80px">
        <el-form-item label="收货地址" prop="address">
          <el-input
            v-model="dialog_address.address"
            placeholder="收货地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input
            v-model="dialog_address.phone"
            placeholder="电话"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edit_dialog = false">关闭</el-button>
        <el-button type="primary" @click="changeReceive()">确认修改</el-button>
      </span>
    </el-dialog>

    <!-- 查看物流dialog -->
    <el-dialog
      title="物流信息"
      :visible.sync="shipping_detail_dialog"
      width="30%"
      center
    >
      <el-form label-width="120px">
        <el-form-item label="物流公司：">
          <span>{{ shipping_detail.company }}</span>
        </el-form-item>
        <el-form-item label="物流单号：">
          <span>{{ shipping_detail.shipping_no }}</span>
        </el-form-item>
        <el-form-item label="发货时间：">
          <span>{{ shipping_detail.express_time }}</span>
        </el-form-item>
        <el-form-item label="发货备注：">
          <span>{{ shipping_detail.express_note }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shipping_detail_dialog = false">关闭</el-button>
      </span>
    </el-dialog>
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
  { type: 'wait_send', name: '待发货' },
  { type: 'wait_use', name: '待核销' },
  { type: 'send', name: '已发货' },
  { type: 'confirm', name: '已收货' },
  { type: 'complete', name: '已完成' }
];
import {
  orderList,
  shippingList,
  deliver,
  changeDeliver
} from '@/servers/request';
import { export_json_to_excel } from '@/assets/Export2Excel.js';
export default {
  name: 'order',
  data: function() {
    return {
      form: {
        keyword: '',
        type: '',
        timeRange: '',
        status: '',
        phone: ''
      },
      total: 0,
      page: 1,
      size: 10,
      list: [],
      orderStatus,
      shipping_dialog: false,
      shipping_detail_dialog: false,
      shipping_detail: {
        company: '',
        shipping_no: '',
        express_time: '',
        express_note: ''
      },
      edit_dialog: false,
      shipping: [],
      dialogForm: {
        code: '',
        company: '',
        tid: '',
        express: '',
        expressNote: ''
      },
      dialog_address: {
        address: '',
        phone: ''
      },
      publicPath: process.env.BASE_URL
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
    exportExcel() {
      let list = [];
      this.$store.commit('updateLoading', true, 'excel导出中...');
      orderList(1, 2000, this.form).then(response => {
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          this.$store.commit('updateLoading', false);
          return false;
        }
        list = resp.data.list;
        const tHeader = [
          '订单号',
          '订单商品',
          '商品类型',
          '商品数量/核销码',
          '结算价',
          '收货信息',
          '备注',
          '支付时间',
          '状态'
        ]; //excel表头
        const data = this.formatJson(list);
        console.log(export_json_to_excel);
        export_json_to_excel({
          header: tHeader,
          data,
          filename: +new Date() + this.$route.meta.title,
          autoWidth: true,
          bookType: 'xlsx'
        });
        this.$store.commit('updateLoading', false);
      });
    },

    formatJson(jsonData) {
      return jsonData.map(v => {
        let arr = [];
        arr.push(v.t_tid);
        arr.push(v.to_title);
        arr.push(v.goods_type_txt);
        arr.push(
          `核销剩余：${v.ticket_valid}\n已被核销：${v.ticket_used}\n商品数量：${v.to_num}`
        );
        arr.push(v.g_seller_price);
        arr.push(
          `昵称：${v.t_buyer_nick}\n电话：${v.t_phone_ext}\n地址：${v.t_address_ext}`
        );
        arr.push(v.t_note);
        arr.push(v.t_pay_time);
        arr.push(v.t_status_txt);
        return arr;
      });
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
    },

    getShipping(tid) {
      // this.$refs["dialogForm"].resetFields();    //此时dom未渲染，无法取得dialogForm，只能通过数据重置
      this.dialogForm = {
        code: '',
        company: '',
        tid: '',
        express: '',
        expressNote: ''
      };
      this.dialogForm.tid = tid;
      //这里之后改为vuex存储状态，控制请求
      if (this.shipping.length == 0) {
        shippingList().then(response => {
          const resp = response.data;
          if (resp.ec !== 200) {
            this.$message.error(resp.em);
            return false;
          }
          this.shipping = resp.data;
        });
      }
      this.shipping_dialog = true;
    },

    submitShipping() {
      for (var a in this.shipping) {
        if (this.shipping[a] == this.dialogForm.company) {
          this.dialogForm.express = a;
          break;
        }
      }

      deliver(this.dialogForm).then(response => {
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return false;
        }

        this.getList();
        this.shipping_dialog = false;
      });
    },

    showEditDialog(row) {
      this.dialog_address.id = row.t_id;
      this.dialog_address.address = row.t_address_ext;
      this.dialog_address.phone = row.t_phone_ext;
      this.edit_dialog = true;
    },

    changeReceive() {
      this.$confirm('确定要修改吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeDeliver(this.dialog_address).then(response => {
          const resp = response.data;
          if (resp.ec !== 200) {
            this.$message.error(resp.em);
            return false;
          }
          this.edit_dialog = false;
          this.$message({
            message: '修改成功',
            type: 'success'
          });

          this.getList();
        });
      });
    },

    showShipping(row) {
      this.shipping_detail_dialog = true;
      this.shipping_detail.company = row.t_express_company;
      this.shipping_detail.shipping_no = row.t_express_code;
      this.shipping_detail.express_time = row.t_express_time;
      this.shipping_detail.express_note = row.t_express_note;
    }
  }
};
</script>
