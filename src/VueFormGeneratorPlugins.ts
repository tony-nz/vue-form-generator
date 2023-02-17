import { App, Plugin } from "vue";
import { initPrimeVue } from "./plugins/primevue";
import { VueFormGeneratorOptions } from "./types/VueFormGeneratorOptions";
import VueFormGenerator from "./components/VueFormGenerator.vue";

export const VueFormGeneratorPlugin: Plugin = {
  install(app: App, options: VueFormGeneratorOptions) {
    /**
     * Register global properties
     */
    app.config.globalProperties.$vueFormGenerator = options;

    /**
     * Load PrimeVue components
     */
    initPrimeVue(app);

    /**
     * Register VueFormGenerator component
     */
    app.component("VueFormGenerator", VueFormGenerator);
  },
};
