import http from "./http";

// 登录
async function postLogin({ username, password }) {
  console.log(username);
  const response = await http.post("merchant.php", {
    account: username,
    password,
    map: "merchant_login"
  });
  return response;
}

//提现列表
async function withdrawList(form) {
  form.map = 'merchant_withdraw';
  return await http.post("merchant.php", form);
}

//订单列表
function orderList(page, size, search) {
  return http({
    url: `merchant.php?map=merchant_order&page=${page}&size=${size}`,
    method: 'post',
    data: search
  })
}
//检测核销码是否能被核销
function checkTicket(data) {
  return http({
    url: `merchant.php?map=check_code`,
    method: 'post',
    data
  })
}
//核销
function verifyTicket(data) {
  return http({
    url: `merchant.php?map=quickly_verify`,
    method: 'post',
    data
  })
}
//核销列表
function verifyList(page, size, data) {
  return http({
    url: `merchant.php?map=verify_list&page=${page}&size=${size}`,
    method: 'post',
    data
  })
}

//商品列表
function goodsList(page,size,data){
  return http({
    url: `merchant.php?map=merchant_goods_index&page=${page}&size=${size}`,
    method: 'post',
    data
  })
}

export {
  postLogin,
  orderList,
  checkTicket,
  verifyTicket,
  withdrawList,
  verifyList,
  goodsList
};

