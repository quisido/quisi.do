import * as jsoncParser from "jsonc-eslint-parser";
import type { ConfigObject } from "eslint/config";
import { DISABLED_BUILTIN_RULES } from "./disabled-builtin-rules.js";
import { DISABLED_TYPESCRIPT_RULES } from "./disabled-typescript-rules.js";
import { FIXABLE_BUILTIN_RULES } from "./fixable-builtin-rules.js";
import { LINTER_OPTIONS } from "./linter-options.js";
import { TYPESCRIPT_LANGUAGE_OPTIONS } from "./typescript-language-option.js";
import { TYPESCRIPT_PLUGIN } from "./typescript-plugin.js";
import { TYPESCRIPT_PLUGIN_RULES } from "./typescript-plugin-rules.js";
import jsonPlugin from "@eslint/json";
import jsoncPlugin from "eslint-plugin-jsonc";
import stylisticPlugin from "@stylistic/eslint-plugin";
import { toFixable } from "./to-fixable.js";

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
      "tsconfig.json"
    ],
    "language": "json/json",
    "linterOptions": LINTER_OPTIONS,
    "name": "@quisido/json",
    "plugins": {
      ...jsonPlugin.configs.recommended.plugins,
      "@stylistic": stylisticPlugin,
      "json": jsonPlugin,
      "jsonc": jsoncPlugin
    },
    "rules": {
      ...toFixable(
        jsonPlugin.rules,
        "json"
      ),

      "@stylistic/indent": [
        "error",
        2
      ],

      "max-lines-per-function": "off"
    }
  },

  // JSON with Comments for humans
  {
    "files": [
      ".vscode/*.json",
      "*.jsonc",
      "tsconfig.json"
    ],
    "language": "json/jsonc",
    "name": "@quisido/jsonc",
    "languageOptions": {
      ...jsonPlugin.configs.recommended.plugins,
      "allowTrailingCommas": true,
      "parser": jsoncParser
    },
    "linterOptions": LINTER_OPTIONS,
    "plugins": {
      "@stylistic": stylisticPlugin,
      "json": jsonPlugin,
      "jsonc": jsoncPlugin
    },
    "rules": {
      ...toFixable(
        jsoncPlugin.rules,
        "jsonc"
      ),

      "@stylistic/indent": [
        "error",
        2
      ],

      "jsonc/comma-dangle": [
        "error",
        "always-multiline"
      ],

      // Replaced by `@stylistic/indent`.
      "jsonc/indent": "off",

      "jsonc/sort-array-values": [
        "error",
        { "order": { "type": "asc" }, "pathPattern": ".*" }
      ],

      "no-unused-expressions": "off",
      "no-unused-vars": "off",
      "strict": "off"
    }
  },

  // TypeScript for humans
  {
    "files": [
      "app/**/*.ts",
      "app/*.ts",
      "test/**/*.ts",
      "test/*.ts",
      "*.ts"
    ],
    "ignores": ["worker-configuration.d.ts"],
    "languageOptions": TYPESCRIPT_LANGUAGE_OPTIONS,
    "linterOptions": LINTER_OPTIONS,
    "name": "@quisido/ts",
    "plugins": {
      "@stylistic": stylisticPlugin,
      "@typescript-eslint": TYPESCRIPT_PLUGIN
    },
    "rules": {
      ...FIXABLE_BUILTIN_RULES,
      ...toFixable(stylisticPlugin.rules, "@stylistic"),
      ...toFixable(
        TYPESCRIPT_PLUGIN_RULES,
        "@typescript-eslint"
      ),
      ...DISABLED_BUILTIN_RULES,
      ...DISABLED_TYPESCRIPT_RULES,

      "@stylistic/indent": [
        "error",
        2
      ],

      "no-global-assign": "error",
      "no-shadow-restricted-names": "error",

      // This is safe due to `no-global-assign` and `no-shadow-restricted-names`.
      "no-undefined": "off",

      "one-var": "off"
    }
  }
];
