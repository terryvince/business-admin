<script>
import asideBar from "./components/AsideBar";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: { asideBar },
  data() {
    return {
      data: []
    };
  },
  computed: {
    ...mapGetters({
      layout: "layout",
      userInfo: "userInfo"
    })
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    logout() {
      console.log(1);
      this.toggleLogin();
      this.$router.replace({ path: "/login" });
    },
    ...mapMutations({
      toggleLayout: "toggleLayout", // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      toggleLogin: "toggleLogin"
    })
  }
};
</script>

<template>
  <div id="app">
    <el-container>
      <el-header v-show="layout.isShowHeader" class="flex-main-between">
        <div class="left-scope fs-20">商户管理系统</div>
        <div class="role flex-main-start">
          <el-dropdown @command="logout">
            <span class="el-dropdown-link color-white">
              {{ userInfo.store_user }}
              <i class="el-icon-caret-bottom left-10"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside v-show="layout.isShowAside" width="200px">
          <aside-bar />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.el-main {
  background: #f1f1f1;
}
.el-container {
  height: 100%;
}
.el-header {
  background: #1a1b20;
  width: 100%;
  height: 45px;
  color: white;
}
.el-aside {
  background: #1a1b20;
  width: 220px;
  max-width: 220px;
  color: white;
}
</style>
