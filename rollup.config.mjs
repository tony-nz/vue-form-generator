import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import clear from "rollup-plugin-clear";
import css from "rollup-plugin-import-css";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import purgecss from "@fullhuman/postcss-purgecss";

export default async function config(args) {
  return {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      vue(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          include: null,
        },
      }),
      clear({
        targets: ["./dist"],
      }),
      postcss({
        extract: true,
        plugins: [
          autoprefixer(),
          tailwind(),
          purgecss({
            content: ["./static/index.html", "./src/**/*.vue"],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ],
      }),
      css(),
    ],
  };
}
