import http from "./http";

// 登录
async function postLogin({ username, password }) {
  const response = await http.post("merchant.php", {
    account: username,
    password,
    map: "merchant_login"
  });
  return response;
}
// 登录
async function logoutLogin() {
  const response = await http.post("merchant.php", {
    map: "merchant_logout"
  });
  return response;
}
async function withdrawList(form) {
  // 提现列表
  form.map = "merchant_withdraw";
  return await http.post("merchant.php", form);
}
async function withdrawApply(form) {
  // 申请提现
  form.map = "merchant_apply";
  return await http.post("merchant.php", form);
}
async function withdrawProduct(form) {
  // 提现产品
  form.map = "merchant_withdraw_product";
  return await http.post("merchant.php", form);
}

//订单列表
function orderList(page, size, search) {
  return http({
    url: `merchant.php?map=merchant_order&page=${page}&size=${size}`,
    method: "post",
    data: search
  });
}
//检测核销码是否能被核销
function checkTicket(data) {
  return http({
    url: `merchant.php?map=check_code`,
    method: "post",
    data
  });
}
//核销
function verifyTicket(data) {
  return http({
    url: `merchant.php?map=quickly_verify`,
    method: "post",
    data
  });
}
//核销列表
function verifyList(page, size, data) {
  return http({
    url: `merchant.php?map=verify_list&page=${page}&size=${size}`,
    method: "post",
    data
  });
}

//商品列表
function goodsList(page, size, data) {
  return http({
    url: `merchant.php?map=merchant_goods_index&page=${page}&size=${size}`,
    method: "post",
    data
  });
}

//提现详情
function withdrawDetail(id) {
  return http({
    url: `merchant.php?map=merchant_detail&w_id=${id}`,
    method: "get"
  });
}

//获取物流列表
function shippingList(){
  return http({
    url: `merchant.php?map=get_deliver`,
    method: 'get',
  })
}

function deliver(data){
  return http({
    url: `merchant.php?map=deliver_order`,
    method: 'post',
    data
  })
}

function changeDeliver(data){
  return http({
    url: `merchant.php?map=change_deliver`,
    method: 'post',
    data
  })
}


export {
  postLogin, //登陆
  logoutLogin, // 退出登录
  orderList, //订单列表
  checkTicket, //检测核销码
  verifyTicket, //快捷核销
  withdrawList, //提现列表
  withdrawApply, //申请提现
  withdrawProduct, //提现产品
  verifyList, // 核销记录
  goodsList, //商品列表
  withdrawDetail, //提现详情
  shippingList, //物流列表
  deliver, //发货
  changeDeliver //修改收货地址
};
