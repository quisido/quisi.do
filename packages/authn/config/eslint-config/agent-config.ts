import type { ConfigObject } from "eslint/config";
import ecmaScriptSyntaxPlugin from "eslint-plugin-es-x";
import eslintCommentsPlugin from "@eslint-community/eslint-plugin-eslint-comments";
import noCommentsPlugin from "eslint-plugin-no-comments";
import promisePlugin from "eslint-plugin-promise";
import securityPlugin from "eslint-plugin-security";
import stylisticPlugin from "@stylistic/eslint-plugin";
import { importX } from "eslint-plugin-import-x";
import { DISABLED_BUILTIN_RULES } from "./disabled-builtin-rules.js";
import { DISABLED_TYPESCRIPT_RULES } from "./disabled-typescript-rules.js";
import { ES_X_NONSTANDARD_RULES_CONFIG } from "./es-x-nonstandard-rules-config.js";
import { LINTER_OPTIONS } from "./linter-options.js";
import { TYPESCRIPT_LANGUAGE_OPTIONS } from "./typescript-language-option.js";
import { TYPESCRIPT_PLUGIN } from "./typescript-plugin.js";
import { TYPESCRIPT_IMPORT_RESOLVER } from "./typescript-import-resolver.js";
import { STRICT_TYPE_CHECKED_RULES_CONFIG } from "./strict-type-checked-rules-config.js";

/**
 * The "agent config" is an ESLint configuration for files owned by coding
 * agents.
 */
export const AGENT_CONFIG: readonly ConfigObject[] = [
  {
    "files": ["src/*.ts", "src/**/*.ts"],
    "languageOptions": TYPESCRIPT_LANGUAGE_OPTIONS,
    "linterOptions": {
      ...LINTER_OPTIONS,
      "noInlineConfig": true,
    },
    "name": "@quisido/agents-ts",
    "plugins": {
      ...promisePlugin.configs["flat/recommended"].plugins,
      ...securityPlugin.configs.recommended.plugins,
      "@stylistic": stylisticPlugin,
      "@typescript-eslint": TYPESCRIPT_PLUGIN,
      "es-x": ecmaScriptSyntaxPlugin,
      "eslint-comments": eslintCommentsPlugin,
      "import-x": importX,
      "no-comments": noCommentsPlugin,
    },
    "rules": {
      // Default rules
      ...ES_X_NONSTANDARD_RULES_CONFIG,
      ...securityPlugin.configs.recommended.rules,
      ...STRICT_TYPE_CHECKED_RULES_CONFIG,

      // Superceded rules
      ...DISABLED_BUILTIN_RULES,
      ...DISABLED_TYPESCRIPT_RULES,

      // Custom rules
      "@stylistic/padded-blocks": ["warn", "never"],
      "@typescript-eslint/consistent-type-assertions": ["error", { "assertionStyle": "never" }],

      /**
       * The ESLint rule is incorrect here when it throws "Explicit undefined is
       * unnecessary on an optional parameter." The rule does not allow for
       * `f(x?: X | undefined)` to be called with `f(undefined)`.
       */
      "@typescript-eslint/no-duplicate-type-constituents": [
        "error",
        { "ignoreUnions": true },
      ],
      "@typescript-eslint/no-invalid-this": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unsafe-type-assertion": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "complexity": "error",
      "curly": ["error", "all"],
      "eqeqeq": "error",
      "eslint-comments/no-aggregating-enable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/no-restricted-disable": ["error", "*"],
      "eslint-comments/no-unlimited-disable": "error",
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-unused-enable": "error",
      "eslint-comments/no-use": "error",
      "import-x/avoid-barrel-files": "error",
      // Some dependencies are vended as namespaces.
      "import-x/avoid-namespace-import": "off",
      "import-x/avoid-re-export-all": "error",
      "import-x/default": "error",
      "import-x/export": "error",
      "import-x/named": "error",
      "import-x/no-absolute-path": "error",
      "import-x/no-amd": "error",
      "import-x/no-commonjs": "error",
      "import-x/no-cycle": "error",
      "import-x/no-deprecated": "error",
      "import-x/no-dynamic-require": "error",
      "import-x/no-extraneous-dependencies": "error",
      "import-x/no-import-module-exports": "error",
      "import-x/no-mutable-exports": "error",
      "import-x/no-named-as-default": "error",
      "import-x/no-named-as-default-member": "error",
      "import-x/no-relative-packages": "error",
      "import-x/no-self-import": "error",
      "import-x/no-unused-modules": [
        "error",
        {
          "ignoreUnusedTypeExports": false,
          "missingExports": true,
          "suppressMissingFileEnumeratorAPIWarning": true,
          "unusedExports": true,
        },
      ],
      "import-x/no-useless-path-segments": "error",
      "import-x/no-webpack-loader-syntax": "error",
      "import-x/unambiguous": "error",
      "max-depth": "error", // 4
      "max-lines": "error", // 300
      "max-lines-per-function": "error", // 50
      "max-nested-callbacks": "error", // 10
      "max-params": ["error", { "countThis": "never" }], // 3
      // "max-statements": "error", // 10
      "no-inline-comments": "error",
      "no-await-in-loop": "error",
      "no-comments/disallowComments": ["error", { "allow": [] }],
      "no-console": "error",
      "no-constant-binary-expression": ["error", { "checkRelationalComparisons": true }],
      "no-global-assign": "error",
      "no-magic-numbers": [
        "error",
        {
          "ignore": [-1, 0, 1],
          "ignoreEnums": true,
          "ignoreNumericLiteralTypes": true,
          "ignoreReadonlyClassProperties": true,
          "ignoreTypeIndexes": true,
        },
      ],
      "no-param-reassign": "error",
      "no-promise-executor-return": "error",
      "no-shadow-restricted-names": "error",

      /**
       * This is safe due to `no-global-assign` and
       * `no-shadow-restricted-names`.
       */
      "no-undefined": "off",
      "no-use-before-define": ["error", {
        "allowNamedExports": false,
        "classes": true,
        "enums": true,
        "ignoreTypeReferences": true,
        "functions": true,
        "typedefs": false,
        "variables": true,
      }],
      "prefer-const": "error",
      "promise/catch-or-return": "error",
      "promise/no-return-wrap": "error",
      "promise/spec-only": "error",
      "promise/valid-params": "error",
      "security/detect-eval-with-expression": "error",
      "security/detect-unsafe-regex": "error",
      "use-isnan": ["error", { "enforceForIndexOf": true }],
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
