import { App, Plugin } from "vue";
import type { VueFormGeneratorOptions } from "./types/VueFormGeneratorOptions";
import VueFormGenerator from "./components/VueFormGenerator.vue";
import "./assets/style.css";

export const VueFormGeneratorPlugin: Plugin = {
  install(app: App, options: VueFormGeneratorOptions) {
    /**
     * Register global properties
     */
    // app.config.globalProperties.$vueFormGenerator = options;
    app.provide("vueFormGenerator", options);

    /**
     * Register VueFormGenerator component
     */
    app.component("VueFormGenerator", VueFormGenerator);
  },
};
