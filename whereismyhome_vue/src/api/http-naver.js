import axios from "axios";

function naverApiInstance() {
  const instance = axios.create({
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

export { naverApiInstance };
