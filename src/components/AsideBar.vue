<script>
import { mapGetters } from "vuex";
export default {
  name: "asideBar",
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    ...mapGetters(["menus"])
  },
  methods: {
    handleNodeClick(data) {
      this.$router.push({ name: data.name });
    }
  }
};
</script>

<template>
  <el-tree
    :data="menus"
    :props="defaultProps"
    accordion
    @node-click="handleNodeClick"
  >
  </el-tree>
</template>

<style lang="scss">
.el-tree {
  background: transparent !important;
  color: white !important;
}
.el-tree-node.is-current > .el-tree-node__content {
  background-color: rgb(0, 150, 136) !important;
}
.el-tree-node.is-current > .el-tree-node__content:focus {
  background-color: rgb(0, 150, 136) !important;
}
.el-tree .el-tree-node__content:hover {
  background-color: rgb(0, 150, 136);
}
</style>
