import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
