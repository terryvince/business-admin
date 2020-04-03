import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import count from "../views/count.vue";
import login from "../views/login.vue";
import notFound from "../views/notFound.vue";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push; //屏蔽路由promise报错
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/",
    redirect: "/count"
  },
  {
    path: "/count",
    name: "count",
    meta: {
      title: "统计"
    },
    component: count
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: login
  },
  {
    path: "/goods",
    name: "goods",
    meta: {
      title: "商品管理"
    },
    component: () =>
      import(/* webpackChunkName: "goods" */ "@/views/goods/index.vue")
  },
  {
    path: "/order",
    name: "order",
    meta: {
      title: "订单管理"
    },
    component: () =>
      import(/* webpackChunkName: "order" */ "@/views/order/index.vue")
  },
  {
    path: "/verifyRecord",
    name: "verifyRecord",
    meta: {
      title: "核销记录"
    },
    component: () =>
      import(
        /* webpackChunkName: "checkRecorder" */ "@/views/ticket/verify-recode.vue"
      )
  },
  {
    path: "/withdraw",
    name: "withdraw",
    meta: {
      title: "提现记录"
    },
    component: () =>
      import(/* webpackChunkName: "withdraw" */ "@/views/withdraw/index.vue")
  },
  {
    path: "/quickVerify",
    name: "quickVerify",
    meta: {
      title: "快捷核销"
    },
    component: () => import("@/views/ticket/quick-verify.vue")
  },
  {
    path: "*",
    name: "notFound",
    component: notFound,
    meta: {
      title: "404"
    }
  }
];

const router = new VueRouter({
  routes
});

const whiteList = ["login", "notFound"];

router.beforeEach((to, from, next) => {
  const { isLogin } = store.state;
  if (whiteList.includes(to.name)) {
    document.title = to.meta.title;
    next();
    return;
  }
  if (isLogin) {
    document.title = to.meta.title;
    next();
  } else {
    document.title = to.meta.title;
    next({ path: "/login", replace: true });
  }
});

export default router;
