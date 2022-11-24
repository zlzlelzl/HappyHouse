import { apiInstance, naverApiInstance } from "./http-common.js";

const naver = naverApiInstance();

async function getNaverNews(params, header, success, fail) {
  let url = `/v1/search/news.json?display=8&query=${params.query}&sort=${params.sort}`;
  await naver.get(url, header).then(success).catch(fail);
}

export { getNaverNews };
