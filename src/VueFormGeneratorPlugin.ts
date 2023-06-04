import { App, Plugin } from "vue";
import type { VueFormGeneratorOptions } from "./types/VueFormGeneratorOptions";
import VueFormGenerator from "./components/VueFormGenerator/VueFormGenerator.vue";
import "./style.css";

export const VueFormGeneratorPlugin: Plugin = {
  install(app: App, options: VueFormGeneratorOptions) {
    /**
     * Register global properties
     */
    // app.config.globalProperties.$vueFormGenerator = options;
    app.provide("vueFormGeneratorOptions", options);

    /**
     * Register VueFormGenerator component
     */
    app.component("VueFormGenerator", VueFormGenerator);
  },
};
