require("@/assets/main.scss");
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import TurbolinksAdapter from "vue-turbolinks";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

createApp(App)
  .use(store)
  .use(router)
  .use(VueSweetalert2)
  .mixin(TurbolinksAdapter)
  .mount("#app");
