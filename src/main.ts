import { createApp } from "vue";
import { createPinia } from "pinia";
import { initPrimeVue } from "./plugins/primevue";
import "@/assets/style.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

/**
 * Initialize PrimeVUE components
 */
initPrimeVue(app);

app.use(pinia);
app.mount("#app");

export default app;
