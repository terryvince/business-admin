export default {
  menus: state => {
    return state.menus;
  },
  layout: state => {
    return state.layout;
  },
  isLogin: state => {
    return state.isLogin;
  },
  userInfo: state => {
    return state.userInfo;
  },
  mainLoading: state => {
    return state.mainLoading;
  },
  currentNodeName: state => {
    return state.currentNodeName;
  }
};
