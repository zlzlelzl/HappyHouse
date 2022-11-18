import { apiInstance } from "./http-common.js";

const api = apiInstance();

// async function login(user, success, fail) {
//   // console.log(user, success);
//   await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
// }

function houseList(params, success, fail) {
  api.get(``, { params: params }).then(success).catch(fail);
}

export { houseList };

