import clear from "rollup-plugin-clear";
import css from "rollup-plugin-import-css";
import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";

export default async function config(args) {
  return {
    input: "src/index.ts",
    external: "src/main.css",
    output: {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      clear({
        targets: ["./dist"],
      }),
      css(),
      vue(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          include: null,
        },
      }),
    ],
  };
}
