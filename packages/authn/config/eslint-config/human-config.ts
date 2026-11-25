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
import sonarjsPlugin from "eslint-plugin-sonarjs";
import stylisticPlugin from "@stylistic/eslint-plugin";
import functionalPlugin from "eslint-plugin-functional";
import vitestPlugin from "@vitest/eslint-plugin";
import { TYPESCRIPT_PLUGIN_RULES } from "./typescript-plugin-rules.js";
import { TYPESCRIPT_PLUGIN } from "./typescript-plugin.js";
import { TYPESCRIPT_LANGUAGE_OPTIONS } from "./typescript-language-option.js";
import { LINTER_OPTIONS } from "./linter-options.js";
import { FIXABLE_BUILTIN_RULES } from "./fixable-builtin-rules.js";
import { ES_X_NONSTANDARD_RULES_CONFIG } from "./es-x-nonstandard-rules-config.js";
import { toFixable } from "./to-fixable.js";
import { TYPESCRIPT_IMPORT_RESOLVER } from "./typescript-import-resolver.js";
import { STRICT_TYPE_CHECKED_RULES_CONFIG } from "./strict-type-checked-rules-config.js";
import { NO_UNSAFE_TYPESCRIPT_RULES_CONFIG } from "./no-unsafe-typescript-rules-config.js";
import { SHARED_TYPESCRIPT_RULES_CONFIG } from "./shared-typescript-rules-config.js";
import assert from "#lib/assert.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { SHARED_BUILTIN_RULES_CONFIG } from "./shared-builtin-rules-config.js";

assert(
  sonarjsPlugin.rules !== undefined,
  "Expected SonarJS plugin to have rules.",
);

const JSON_RULES: ReadonlyDeep<RulesConfig> = {
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
 * should optimize for readability above all else.
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

      // Universal rules
      ...SHARED_BUILTIN_RULES_CONFIG,

      // Custom rules
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

      // Universal rules
      ...SHARED_BUILTIN_RULES_CONFIG,

      // Custom rules
      // Replaced by `jsonc/indent`.
      "@stylistic/indent": "off",
      "jsonc/comma-dangle": ["error", "always-multiline"],
      "jsonc/indent": ["error", 2],
      "jsonc/object-curly-newline": ["error", { "consistent": true }],
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
      "config/**/*.ts",
      "config/*.ts",
      "config/**/*.ts",
      "lib/**/*.ts",
      "lib/*.ts",
      "test/**/*.ts",
      "test/*.ts",
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
      "functional": functionalPlugin,
      "import-x": importX,
      "sonarjs": sonarjsPlugin,
      "vitest": vitestPlugin,
    },
    "rules": {
      // Default rules
      ...ES_X_NONSTANDARD_RULES_CONFIG,
      ...NO_UNSAFE_TYPESCRIPT_RULES_CONFIG,
      ...securityPlugin.configs.recommended.rules,
      ...STRICT_TYPE_CHECKED_RULES_CONFIG,
      ...vitestPlugin.configs.recommended.rules,

      // Fixable rules
      ...FIXABLE_BUILTIN_RULES,
      ...toFixable(functionalPlugin.rules, "functional"),
      ...toFixable(importX.rules, "import-x"),
      ...toFixable(promisePlugin.rules, "promise"),
      ...toFixable(securityPlugin.rules, "security"),
      ...toFixable(sonarjsPlugin.rules, "sonarjs"),
      ...toFixable(stylisticPlugin.rules, "@stylistic"),
      ...toFixable(TYPESCRIPT_PLUGIN_RULES, "@typescript-eslint"),
      ...toFixable(vitestPlugin.rules, "vitest"),

      // Universal rules
      ...SHARED_BUILTIN_RULES_CONFIG,
      ...SHARED_TYPESCRIPT_RULES_CONFIG,

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
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "ignoreRestSiblings": false,
        },
      ],
      "@typescript-eslint/prefer-readonly": "error",
      "eslint-comments/require-description": ["error", { "ignore": [] }],
      "functional/prefer-property-signatures": "error",
      "import-x/group-exports": "error",
      "import-x/no-anonymous-default-export": "error",
      "import-x/no-extraneous-dependencies": "error",
      "import-x/no-nodejs-modules": "warn",
      "one-var": "off",
      "promise/prefer-await-to-callbacks": "error",
      "promise/prefer-await-to-then": "error",
      "promise/prefer-catch": "error",
      "vitest/no-importing-vitest-globals": "off",
      "vitest/no-test-return-statement": "error",

      /**
       * This rule is unnecessary since this package does not import Vitest
       * types globally. It also prevents similarly-named functions, like
       * `assert`, from being imported.
       */
      "vitest/prefer-importing-vitest-globals": "off",
      "vitest/prefer-lowercase-title": "off",
      "vitest/require-to-throw-message": "error",
    },

    "settings": {
      "es-x": {
        "aggressive": true,
      },
      "import-x/extensions": [".js", ".json", ".jsonc"],
      "import-x/resolver-next": [TYPESCRIPT_IMPORT_RESOLVER],
      "vitest": {
        "typecheck": true,
      },
    },
  },

  // TypeScript definition files
  {
    "files": [
      "config/**/*.d.ts",
      "config/*.d.ts",
      "config/**/*.d.ts",
      "lib/**/*.d.ts",
      "lib/*.d.ts",
      "test/**/*.d.ts",
      "test/*.d.ts",
      "*.d.ts",
    ],
    "ignores": [".wrangler/", "coverage/", "node_modules/", "worker-configuration.d.ts"],
    "languageOptions": TYPESCRIPT_LANGUAGE_OPTIONS,
    "linterOptions": LINTER_OPTIONS,
    "name": "@quisido/d-ts",

    "plugins": {
      "import-x": importX,
    },

    "rules": {
      // Universal rules
      ...SHARED_BUILTIN_RULES_CONFIG,

      // Custom rules
      "import-x/unambiguous": "off",
      "init-declarations": "off",
    },

    "settings": {
      "import-x/extensions": [".js", ".json", ".jsonc"],
      "import-x/resolver-next": [TYPESCRIPT_IMPORT_RESOLVER],
    },
  },
];
