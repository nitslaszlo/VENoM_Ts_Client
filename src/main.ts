import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store/index";
// import axios, { AxiosRequestConfig } from "axios";

import Vuetify from "vuetify";
Vue.use(Vuetify);

import "./style.scss";

// import { AxiosPlugin } from "./axios-plugin";

// pass in your custom options as second parameter if applicable
// const axiosConfig: AxiosRequestConfig = {
//   baseURL: "https://localhost:3000",
//   timeout: 30000
// };
// Setting up Axios on Vue Instance, for use via this.$axios
// Vue.prototype.$axios = axios.create(axiosConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
