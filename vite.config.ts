import { defineConfig } from "vite";
import { resolve } from "path";
import copy from "rollup-plugin-copy";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import libInjectCss from "./libInjectCss";

export default defineConfig({
  plugins: [
    dts({
      include: "src/*.d.ts",
    }),
    copy({
      targets: [{ src: "./src/index.d.ts", dest: "./dist" }],
    }),
    vue(),
    {
      name: "copy-index-dts",
      writeBundle: async () => {
        const { promises } = require("fs");
        await promises.copyFile("./src/index.d.ts", "./dist/index.d.ts");
      },
    },
    // https://github.com/vitejs/vite/issues/4345
    // chenyueban
    // libInjectCss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueFormGenerator",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
      },
    },
  },
});
