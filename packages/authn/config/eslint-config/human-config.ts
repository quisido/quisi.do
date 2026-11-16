import * as jsoncParser from "jsonc-eslint-parser";
import type { ConfigObject } from "eslint/config";
import type { RulesConfig } from "@eslint/core";
import ecmaScriptSyntaxPlugin from "eslint-plugin-es-x";
import eslintCommentsPlugin from "@eslint-community/eslint-plugin-eslint-comments";
import { importX } from "eslint-plugin-import-x";
import jsonPlugin from "@eslint/json";
import jsoncPlugin from "eslint-plugin-jsonc";
import promisePlugin from "eslint-plugin-promise";
import securityPlugin from "eslint-plugin-security";
import stylisticPlugin from "@stylistic/eslint-plugin";
import { TYPESCRIPT_PLUGIN_RULES } from "./typescript-plugin-rules.js";
import { TYPESCRIPT_PLUGIN } from "./typescript-plugin.js";
import { TYPESCRIPT_LANGUAGE_OPTIONS } from "./typescript-language-option.js";
import { LINTER_OPTIONS } from "./linter-options.js";
import { FIXABLE_BUILTIN_RULES } from "./fixable-builtin-rules.js";
import { ES_X_NONSTANDARD_RULES_CONFIG } from "./es-x-nonstandard-rules-config.js";
import { DISABLED_TYPESCRIPT_RULES } from "./disabled-typescript-rules.js";
import { DISABLED_BUILTIN_RULES } from "./disabled-builtin-rules.js";
import { toFixable } from "./to-fixable.js";
import { TYPESCRIPT_IMPORT_RESOLVER } from "./typescript-import-resolver.js";

const JSON_RULES: RulesConfig = {
  ...toFixable(jsonPlugin.rules, "json"),
  "json/no-duplicate-keys": "error",
  "json/no-empty-keys": "error",
  "json/no-unnormalized-keys": "error",
  "json/no-unsafe-values": "error",
  // Replaced by `jsonc/sort-keys`.
  "json/sort-keys": "off",
  "jsonc/sort-keys": [
    "error",
    "asc",
    {
      "allowLineSeparatedGroups": false,
      "caseSensitive": true,
      "minKeys": 2,
      "natural": false,
    },
  ],
};

/**
 * The "human config" is an ESLint configuration for files owned by humans. It
 * should optimize for readability, making it more strict than the agent config.
 */
export const HUMAN_CONFIG: readonly ConfigObject[] = [
  // JSON for humans
  {
    "files": ["*.json"],
    "ignores": [
      ".vscode/*.json",
      "tsconfig.json",
    ],
    "language": "json/json",
    "linterOptions": LINTER_OPTIONS,
    "name": "@quisido/json",
    "plugins": {
      ...jsonPlugin.configs.recommended.plugins,
      "@stylistic": stylisticPlugin,
      "json": jsonPlugin,
      "jsonc": jsoncPlugin,
    },
    "rules": {
      ...JSON_RULES,
      "@stylistic/indent": ["error", 2],
      "max-lines-per-function": "off",
    },
  },

  // JSON with Comments for humans
  {
    "files": [
      ".vscode/*.json",
      "*.jsonc",
      "tsconfig.json",
    ],
    "language": "json/jsonc",
    "name": "@quisido/jsonc",
    "languageOptions": {
      ...jsonPlugin.configs.recommended.plugins,
      "allowTrailingCommas": true,
      "parser": jsoncParser,
    },
    "linterOptions": LINTER_OPTIONS,
    "plugins": {
      "@stylistic": stylisticPlugin,
      "json": jsonPlugin,
      "jsonc": jsoncPlugin,
    },
    "rules": {
      ...toFixable(jsoncPlugin.rules, "jsonc"),
      ...JSON_RULES,
      "@stylistic/indent": ["error", 2],
      "jsonc/comma-dangle": ["error", "always-multiline"],

      // Replaced by `@stylistic/indent`.
      "jsonc/indent": "off",

      "jsonc/sort-array-values": [
        "error",
        {
          "order": { "type": "asc" },
          "pathPattern": ".*",
        },
      ],

      "no-unused-expressions": "off",
      "no-unused-vars": "off",
      "strict": "off",
    },
  },

  // TypeScript for humans
  {
    "files": [
      "app/**/*.ts",
      "app/*.ts",
      "config/**/*.ts",
      "config/*.ts",
      "*.ts",
    ],
    "ignores": ["worker-configuration.d.ts"],
    "languageOptions": TYPESCRIPT_LANGUAGE_OPTIONS,
    "linterOptions": LINTER_OPTIONS,
    "name": "@quisido/ts",
    "plugins": {
      ...promisePlugin.configs["flat/recommended"].plugins,
      ...securityPlugin.configs.recommended.plugins,
      "@stylistic": stylisticPlugin,
      "@typescript-eslint": TYPESCRIPT_PLUGIN,
      "es-x": ecmaScriptSyntaxPlugin,
      "eslint-comments": eslintCommentsPlugin,
      "import-x": importX,
    },
    "rules": {
      // Default rules
      ...ES_X_NONSTANDARD_RULES_CONFIG,
      ...securityPlugin.configs.recommended.rules,

      // Fixable rules
      ...FIXABLE_BUILTIN_RULES,
      ...toFixable(importX.rules, "import-x"),
      ...toFixable(promisePlugin.rules, "promise"),
      ...toFixable(securityPlugin.rules, "security"),
      ...toFixable(stylisticPlugin.rules, "@stylistic"),
      ...toFixable(TYPESCRIPT_PLUGIN_RULES, "@typescript-eslint"),

      // Superceded rules
      ...DISABLED_BUILTIN_RULES,
      ...DISABLED_TYPESCRIPT_RULES,

      // Custom rules
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/max-len": ["error", {
        "code": 80,
        "ignoreComments": false,
        "ignorePattern": "^\\s*\\/\\/ (?:@ts-expect-error|eslint-disable-next-line (?:@[\\d\\w][-\\d\\w]*\\/)?[\\d\\w][-\\d\\w]*)[^-\\d\\w]",
        "ignoreRegExpLiterals": true,
        "ignoreStrings": true,
        "ignoreTrailingComments": false,
        "ignoreUrls": true,
        "ignoreTemplateLiterals": true,
        "tabWidth": 2,
      }],
      "eslint-comments/no-aggregating-enable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/no-unlimited-disable": "error",
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-unused-enable": "error",
      "eslint-comments/require-description": ["error", { "ignore": [] }],
      "import-x/avoid-barrel-files": "error",
      // Some dependencies are vended as namespaces.
      "import-x/avoid-namespace-import": "off",
      "import-x/avoid-re-export-all": "error",
      "import-x/default": "error",
      "import-x/export": "error",
      "import-x/group-exports": "error",
      "import-x/named": "error",
      "import-x/no-absolute-path": "error",
      "import-x/no-amd": "error",
      "import-x/no-anonymous-default-export": "error",
      "import-x/no-commonjs": "error",
      "import-x/no-cycle": "error",
      "import-x/no-deprecated": "warn",
      "import-x/no-dynamic-require": "error",
      "import-x/no-extraneous-dependencies": "error",
      "import-x/no-import-module-exports": "error",
      "import-x/no-mutable-exports": "error",
      "import-x/no-named-as-default": "error",
      "import-x/no-named-as-default-member": "error",
      "import-x/no-nodejs-modules": "warn",
      "import-x/no-relative-packages": "error",
      "import-x/no-self-import": "error",
      "import-x/no-unused-modules": "error",
      "import-x/no-useless-path-segments": "error",
      "import-x/no-webpack-loader-syntax": "error",
      "import-x/unambiguous": "error",
      "no-global-assign": "error",
      "no-shadow-restricted-names": "error",

      /**
       * This is safe due to `no-global-assign` and
       * `no-shadow-restricted-names`.
       */
      "no-undefined": "off",
      "one-var": "off",
      "promise/catch-or-return": "error",
      "promise/no-return-wrap": "error",
      "promise/prefer-await-to-callbacks": "error",
      "promise/prefer-await-to-then": "error",
      "promise/prefer-catch": "error",
      "promise/spec-only": "error",
      "promise/valid-params": "error",
    },

    "settings": {
      "es-x": {
        "aggressive": true,
      },
      "import-x/extensions": [".js", ".json", ".jsonc"],
      "import-x/resolver-next": [TYPESCRIPT_IMPORT_RESOLVER],
    },
  },
];
