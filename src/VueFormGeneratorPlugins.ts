import { App, Plugin } from "vue";
import { VueFormGeneratorOptions } from "./types/VueFormGeneratorOptions";
import VueFormGenerator from "./components/VueFormGenerator.vue";
import "./styles/tailwind.css";

export const VueFormGeneratorPlugin: Plugin = {
  install(app: App, options: VueFormGeneratorOptions) {
    /**
     * Register global properties
     */
    app.config.globalProperties.$vueFormGenerator = options;

    /**
     * Register VueFormGenerator component
     */
    app.component("VueFormGenerator", VueFormGenerator);
  },
};
