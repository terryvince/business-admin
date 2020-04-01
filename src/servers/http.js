import axios from "axios";
import qs from "qs";
import store from "../store";
const http = axios.create({
  //   baseURL: "http://shopping.zhjl.link/",
  baseURL: "/api/", //使用代理跨域
  timeout: 1000 * 60
});
http.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

http.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    if (
      config.method == "post" &&
      config.headers.post["Content-Type"].includes("x-www-form-urlencoded")
    ) {
      config.data = qs.stringify(config.data);
    }
    if (store.state.userInfo.login_token) {
      config.headers["token"] = store.state.userInfo.login_token;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default http;
