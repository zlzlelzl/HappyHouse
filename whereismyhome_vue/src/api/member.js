import { apiInstance } from "./http-common.js";

const api = apiInstance();

async function login(user, success, fail) {
  // console.log(user, success);
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function regist(user, success, fail) {
  // console.log(user, success);
  await api.post(`/user/`, JSON.stringify(user)).then(success).catch(fail);
}
async function checkId(user, success, fail) {
  // console.log(user);
  await api.get(`/user/idcheck?userid=${user.userid}`).then(success).catch(fail);
}

async function update(user, success, fail) {
  // console.log(user, success);
  await api.put(`/user/`, JSON.stringify(user)).then(success).catch(fail);
}
async function del(user, success, fail) {
  // console.log(user, success);
  await api.delete(`/user/`, JSON.stringify(user)).then(success).catch(fail);
}
export { login, findById, tokenRegeneration, logout, regist, checkId, del, update };
