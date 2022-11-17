import { getNaverNews } from "@/api/naver.js";

const newsStore = {
  namespaced: true,
  state: {
    news: [],
  },

  getters: {},
  mutations: {
    SET_NEWS_LIST: (state, news) => {
      state.news = news;
    },
    CLEAR_NEWS_LIST: (state) => {
      state.news = [];
    },
  },

  actions: {
    getNews: ({ commit }, searchText) => {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      const SERVICE_KEY = process.env.VUE_APP_NAVER_NEWS_API_KEY;
      const SERVICE_SECRET = process.env.VUE_APP_NAVER_NEWS_API_SECRET;
      const params = {
        query: searchText,
        sort: "date",
        // serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      const header = {
        headers: {
          "Content-Type": "text/json;charset=utf-8",
          "Access-Control_Allow-Origin": "*",
          "X-Naver-Client-Id": SERVICE_KEY,
          "X-Naver-Client-Secret": SERVICE_SECRET,
        },
      };
      getNaverNews(
        params,
        header,
        ({ data }) => {
          //   console.log(response.data.response.body.items.item);
          commit("SET_NEWS_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default newsStore;
