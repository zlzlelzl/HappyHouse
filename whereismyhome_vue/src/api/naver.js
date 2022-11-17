import { naverApiInstance } from "./http-naver.js";

const naver = naverApiInstance();

function getNaverNews(params, header, success, fail) {
  naver
    .get(`/v1/search/news.json`, { params: params, headers: header })
    .then(success)
    .catch(fail);
}

export { getNaverNews };
