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
export { postLogin, orderList, checkTicket, verifyTicket };
