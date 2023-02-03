import esbuild from "rollup-plugin-esbuild";
import json from "@rollup/plugin-json";

export default {
  input: "src/_main.ts",
  output: {
    format: "cjs",
    file: "bin/main.js",
    banner: "#!/usr/bin/env node",
  },
  plugins: [esbuild(), json()],
  external: (id) => !/^[./]/.test(id),
};
