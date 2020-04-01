<template>
  <div class="shortcut-check">
    <el-form
      :inline="true"
      :label-position="'left'"
      :model="form"
      size="mini"
      class="flex-main-start"
    >
      <el-form-item>
        <el-input
          v-model="form.goodsName"
          placeholder="请输入核销码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="left-20"
          type="primary"
          @click="centerDialogVisible = true"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 弹框 -->
    <el-dialog
      title="快捷核销"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-checkbox-group v-model="dialogForm.type">
            <el-checkbox
              label="【正宗麻辣鱼】【麻辣鱼三人餐】【892833】"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="【正宗麻辣鱼】【麻辣鱼三人餐】【892833】"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="【正宗麻辣鱼】【麻辣鱼三人餐】【892833】"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >核销</el-button
        >
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
// @ is an alias to /src
export default {
  name: "shortcutCheck",
  data: function() {
    return {
      form: { goodsName: "" },
      dialogForm: {
        type: ""
      },
      centerDialogVisible: false
    };
  },
  components: {},
  methods: {
    onSubmit() {
      console.log(1);
    }
  }
};
</script>
