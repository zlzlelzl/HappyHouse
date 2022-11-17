import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import newsStore from "@/store/modules/newsStore.js";

export default new Vuex.Store({
  modules: {
    newsStore,
  },
  plugins: [],
});
