import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.component("font-awesome-icon", FontAwesomeIcon);
new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
