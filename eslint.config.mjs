import path from "node:path";
import { fileURLToPath } from "node:url";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  {
    ignores: ["**/next-env.d.ts"],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint-config-prettier",
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
    ),
  ),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "react-hooks": fixupPluginRules(reactHooks),
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.ts?(x)"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^\\u0000", "^node:", "^@?\\w", "^", "^\\."]],
        },
      ],
    },
  },
];

export default eslintConfig;
