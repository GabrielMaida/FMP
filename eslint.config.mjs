import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["**/*.js"],
    languageOptions: {sourceType: "commonjs"}
  },
  {
    ignores: ["src/app.js"],
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
];