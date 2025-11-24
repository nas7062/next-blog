// eslint.config.cjs
const eslintPluginNext = require("@next/eslint-plugin-next");

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  {
    ignores: ["node_modules/", ".next/", "dist/", "out/"],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      "@next/next": eslintPluginNext,
    },
    rules: {
      // 필요하면 규칙 추가
      // 예: "no-console": "warn",
    },
  },
];
