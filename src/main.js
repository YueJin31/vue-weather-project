import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import localizeFilter from "@/filters/localize.filter";

import "./assets/styles/base.scss";

const app = createApp(App).use(store).use(router);

app.config.globalProperties.$filters = {
  localizeFilter,
};

app.mount("#app");
