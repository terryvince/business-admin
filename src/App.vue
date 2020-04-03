<script>
import asideBar from "./components/AsideBar";
import { mapMutations, mapGetters } from "vuex";
import { logoutLogin } from "@/servers/request";
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
      userInfo: "userInfo",
      mainLoading: "mainLoading"
    })
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    logout() {
      // 退出登录
      logoutLogin().then(res => {
        if (res.data.ec == 200) {
          this.toggleLogin();
          this.$router.replace({ path: "/login" });
        }
      });
    },
    ...mapMutations({
      toggleLayout: "toggleLayout",
      toggleLogin: "toggleLogin"
    })
  }
};
</script>

<template>
  <div id="app">
    <el-container
      v-loading="mainLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
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
          <div class="flex-main-start" style="margin-bottom:15px">
            <i class="el-icon-map-location"></i>
            <el-breadcrumb
              separator-class="el-icon-arrow-right"
              class="left-10"
            >
              <el-breadcrumb-item class="fs-12">{{
                $route.meta.title
              }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
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
