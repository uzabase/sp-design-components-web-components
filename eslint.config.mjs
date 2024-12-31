import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import pluginWc from "eslint-plugin-wc";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist", "tools"], // TODO: 一旦toolsは無視して導入するが、後でちゃんと対応する
  },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginWc.configs["flat/best-practice"],
  prettier,
];
