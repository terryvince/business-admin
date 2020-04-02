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


async function withdrawList(form) { // 提现列表
  form.map = 'merchant_withdraw';
  return  await http.post("merchant.php", form);
}

async function withdrawApply(form) { // 申请提现
  form.map = 'merchant_apply';
  return  await http.post("merchant.php", form);
}
async function withdrawProduct(form) { // 提现产品
  form.map = 'merchant_withdraw_product';
  return  await http.post("merchant.php", form);
}

function orderList(page, size, search) {
  return http({
    url: `merchant.php?map=merchant_order&page=${page}&size=${size}`,
    method: 'post',
    data: search
  })
}

function checkTicket(data) {
  return http({
    url: `merchant.php?map=check_code`,
    method: 'post',
    data
  })
}

function verifyTicket(data) {
  
  return http({
    url: `merchant.php?map=quickly_verify`,
    method: 'post',
    data
  })
}


export { postLogin, orderList, checkTicket, verifyTicket,withdrawList,withdrawApply,withdrawProduct };
