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
    ...mapGetters(["menus", "currentNodeName"])
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
    node-key="name"
    :current-node-key="currentNodeName"
    ref="tree"
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
.el-tree .el-tree-node .el-tree-node__content {
  height: 30px;
}
.el-tree .el-tree-node:focus > .el-tree-node__content {
  background-color: rgb(0, 150, 136);
}
.el-tree-node.is-current > .el-tree-node__content {
  background-color: rgb(0, 150, 136) !important;
}
.el-tree .el-tree-node__content:hover {
  background-color: rgb(0, 150, 136);
}
</style>
