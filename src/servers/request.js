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

function orderList(page,size,search) {
  return http.post("merchant.php", {
    map: "merchant_order",
    page,
    size,
    search
  });
}
export { postLogin, orderList };
