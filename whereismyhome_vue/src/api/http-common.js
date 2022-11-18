import axios from "axios";

function apiInstance() {
  const instance = axios.create({
    // baseURL: process.env.VUE_APP_API_BASE_URL,
    baseURL: "http://localhost:9999/vue",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}
function naverApiInstance() {
  const instance = axios.create({
    headers: {
      baseURL: "",
      "Content-type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { apiInstance, naverApiInstance };
