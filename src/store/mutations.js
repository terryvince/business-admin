const mutations = {
  // 控制主体区域的加载图标显示 false 不显示加载，true显示加载
  updateLoading(state, isLoading) {
    state.mainLoading = isLoading;
  },
  toggleLayout(state) {
    // 切换布局状态，控制侧边栏和头部显示隐藏
    state.layout.isShowAside = !state.layout.isShowAside;
    state.layout.isShowHeader = !state.layout.isShowHeader;
    sessionStorage.setItem("layout", JSON.stringify(state.layout));
  },
  toggleLogin(state, userInfo) {
    // 切换登录状态
    state.isLogin = !state.isLogin;
    if (state.isLogin) {
      state.userInfo = userInfo;
      const info = JSON.stringify(userInfo);
      sessionStorage.setItem("userInfo", info);
      sessionStorage.setItem("isLogin", state.isLogin);
    } else {
      sessionStorage.clear();
      this.commit("toggleLayout");
    }
  }
};

export default mutations;
