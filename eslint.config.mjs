import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginWc from "eslint-plugin-wc";
import globals from "globals";
import tseslint from "typescript-eslint";

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
  pluginImport.flatConfigs.recommended,
  {
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/no-unresolved": "off", // FIXME: 正しいインポート文でも警告が表示されることがあるので一旦無効化
      "import/no-duplicates": "off", // FIXME: 現在のテストの書き方では警告が表示されるので一旦無効化
    },
  },
  prettier,
];
