import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

import boardStore from "@/store/modules/boardStore";
import mapStore from "@/store/modules/mapStore";
import newsStore from "@/store/modules/newsStore.js";
import memberStore from "@/store/modules/memberStore.js";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    boardStore,
    mapStore,
    newsStore,
    memberStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
