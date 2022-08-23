import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./locales";

import "./styles/normalize.css";
import "./styles/system.css";

createApp(App).use(i18n).mount("#app");
