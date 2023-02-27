import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import path from "path";

module.exports = defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "component_library",
      fileName: (format) => `component_library.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
