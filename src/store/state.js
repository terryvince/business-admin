const isLogin = sessionStorage.getItem("isLogin") || false;
let userInfo = {};
if (sessionStorage.getItem("userInfo")) {
  userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
}
let layout = {
  //是否显示侧边栏和头部
  isShowAside: false,
  isShowHeader: false
};
if (sessionStorage.getItem("layout")) {
  layout = JSON.parse(sessionStorage.getItem("layout"));
}
export default {
  layout: layout,
  isLogin: isLogin, // 是否登录
  userInfo: userInfo,
  menus: [
    //菜单
    {
      label: "统计",
      name: "count"
    },
    {
      label: "商品管理",
      name: "goods"
    },
    {
      label: "订单管理",
      name: "order"
    },
    {
      label: "核销记录",
      name: "verifyRecord"
    },
    {
      label: "提现记录",
      name: "withdraw"
    },
    {
      label: "快捷核销",
      name: "quickVerify"
    }
  ]
};
