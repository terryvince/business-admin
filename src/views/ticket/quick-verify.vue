<template>
  <div class="shortcut-check">
    <el-form
      :rules="rules"
      ref="form1"
      :model="form1"
      :inline="true"
      :label-position="'left'"
      size="mini"
      class="flex-main-start"
    >
      <el-form-item prop="code">
        <el-input v-model="form1.code" placeholder="请输入核销码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="left-20" type="primary" @click="checkTick('form1')">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 弹框 -->
    <el-dialog title="快捷核销" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form ref="dialogForm" :model="dialogForm" label-width="80px">
        <el-form-item v-for="(item,index) in product" :key="index">
          <el-checkbox-group v-for="item1 in item" :key="item1.gt_id" v-model="dialogForm.codes">
            <el-checkbox :label="item1.gt_id">{{item1.gt_desc}}</el-checkbox>
          </el-checkbox-group>
          <el-divider></el-divider>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="verifyTick()">核销</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.shortcut-check {
  background: white;
  min-height: 100px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
<script>
import { checkTicket, verifyTicket } from "@/servers/request";
export default {
  name: "shortcutCheck",
  data: function() {
    return {
      form1: {
        code: ""
      },
      product: {},
      dialogForm: {
        codes: []
      },
      centerDialogVisible: false,
      rules: {
        code: [{ required: true, message: "核销码不能为空", trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    checkTick(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false;
        checkTicket(this.form1).then(response => {
          const resp = response.data;
          if (resp.ec !== 200) {
            this.$message.error(resp.em);
            return;
          }

          if (resp.data.length == 0) {
            this.$message.error("没有相关数据");
            return;
          }
          this.centerDialogVisible = true;
          this.product = resp.data.order_product;
          this.merchant = resp.data.merchant.merchant_name;
          this.order = resp.data.order;
        });
      });
    },
    verifyTick() {
      verifyTicket(this.dialogForm).then(response => {
        const resp = response.data;
        if (resp.ec !== 200) {
          this.$message.error(resp.em);
          return;
        }
        //清空记录
        this.$message({
            'message':'核销完成',
            'type' : 'success'
        })
        this.$refs["dialogForm"].resetFields();
        this.centerDialogVisible = false;
        this.product = {};
      });
    }
  }
};
</script>
