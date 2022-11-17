import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import newsStore from "@/store/modules/newsStore.js";
import memberStore from "@/store/modules/memberStore.js";

export default new Vuex.Store({
  modules: {
    newsStore,
    memberStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
