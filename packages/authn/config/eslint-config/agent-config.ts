import type { ConfigObject } from "eslint/config";
import ecmaScriptSyntaxPlugin from "eslint-plugin-es-x";
import eslintCommentsPlugin from "@eslint-community/eslint-plugin-eslint-comments";
import noCommentsPlugin from "eslint-plugin-no-comments";
import promisePlugin from "eslint-plugin-promise";
import functionalPlugin from "eslint-plugin-functional";
import securityPlugin from "eslint-plugin-security";
import sonarjsPlugin, { configs as sonarjsPluginConfigs } from "eslint-plugin-sonarjs";
import stylisticPlugin from "@stylistic/eslint-plugin";
import { importX } from "eslint-plugin-import-x";
import { ES_X_NONSTANDARD_RULES_CONFIG } from "./es-x-nonstandard-rules-config.js";
import { LINTER_OPTIONS } from "./linter-options.js";
import { TYPESCRIPT_LANGUAGE_OPTIONS } from "./typescript-language-option.js";
import { TYPESCRIPT_PLUGIN } from "./typescript-plugin.js";
import { TYPESCRIPT_IMPORT_RESOLVER } from "./typescript-import-resolver.js";
import { STRICT_TYPE_CHECKED_RULES_CONFIG } from "./strict-type-checked-rules-config.js";
import { NO_UNSAFE_TYPESCRIPT_RULES_CONFIG } from "./no-unsafe-typescript-rules-config.js";
import { SHARED_TYPESCRIPT_RULES_CONFIG } from "./shared-typescript-rules-config.js";
import { SHARED_BUILTIN_RULES_CONFIG } from "./shared-builtin-rules-config.js";

/**
 * The "agent config" is an ESLint configuration for files owned by coding
 * agents. It should optimize for code accuracy, maintainability, and security.
 */
export const AGENT_CONFIG: readonly ConfigObject[] = [
  // TypeScript files
  {
    "files": ["src/**/*.ts", "src/*.ts"],
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
      "functional": functionalPlugin,
      "import-x": importX,
      "no-comments": noCommentsPlugin,
      "sonarjs": sonarjsPlugin,
    },
    "rules": {
      // Default rules
      ...ES_X_NONSTANDARD_RULES_CONFIG,
      ...NO_UNSAFE_TYPESCRIPT_RULES_CONFIG,
      ...securityPlugin.configs.recommended.rules,
      ...sonarjsPluginConfigs.recommended.rules,
      ...STRICT_TYPE_CHECKED_RULES_CONFIG,

      // Universal rules
      ...SHARED_BUILTIN_RULES_CONFIG,
      ...SHARED_TYPESCRIPT_RULES_CONFIG,

      // This is only a warning, because it is fixable but should not block.
      "@stylistic/padded-blocks": ["warn", "never"],
      "@typescript-eslint/no-unused-vars": "off",
      // This is only a warning, because it is fixable but should not block.
      "@typescript-eslint/prefer-readonly": "warn",
      "complexity": "error",
      "eslint-comments/no-restricted-disable": ["error", "*"],
      "eslint-comments/no-use": "error",
      "functional/immutable-data": "error",
      "functional/no-let": "error",
      "functional/prefer-immutable-types": "error",
      "functional/readonly-type": "error",
      "functional/type-declaration-immutability": "error",
      "import-x/no-extraneous-dependencies": ["error", { "devDependencies": false }],
      "import-x/no-restricted-paths": ["error", {
        "zones": [
          {
            "except": ["./lib/", "./src/"],
            "from": ".",
            "message": "You may only import files from `src/`.",
            "target": "./src/",
          },
        ],
      }],
      "max-depth": "error", // 4
      "max-lines": "error", // 300
      "max-lines-per-function": "error", // 50
      "max-nested-callbacks": "error", // 10
      "max-params": ["error", { "countThis": "never" }], // 3
      "max-statements": "error", // 10
      "no-await-in-loop": "error",
      "no-comments/disallowComments": ["error", { "allow": [] }],
      "no-console": "error",
      "no-inline-comments": "error",
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
      "no-promise-executor-return": "error",
      "no-restricted-globals": ["error", {
        "checkGlobalObject": true,
        "globals": [
          "crypto",
          {
            "message": "Import `{ logError, logInfo }` from `#lib/log.js` instead.",
            "name": "console",
          },
          {
            "message": "Import `fetch` from `#lib/fetch.js` instead.",
            "name": "fetch",
          },
        ],
      }],
      "no-restricted-properties": [
        "error",
        {
          "object": "console",
          "message": "Import `{ logError }` from `#lib/log.js` instead.",
          "property": "error",
        },
        {
          "object": "console",
          "message": "Import `{ logInfo }` from `#lib/log.js` instead.",
          "property": "log",
        },
        {
          "object": "Date",
          "message": "Import `now` from `#lib/now.js` instead.",
          "property": "now",
        },
        {
          "object": "Math",
          "message": "Import `random` from `#lib/random.js` instead.",
          "property": "random",
        },
        {
          "object": "Object",
          "property": "defineProperties",
        },
        {
          "object": "Object",
          "property": "defineProperty",
        },
      ],
      "no-restricted-syntax": [
        "error",

        {
          "message": "No prototype assignment.",
          "selector": "AssignmentExpression > MemberExpression.left[property.name='prototype']",
        },
        {
          "message": "SQL must be a literal.",
          "selector": "CallExpression[callee.property.name='prepare'][arguments.0.type!='Literal']",
        },

        /*
         * {
         *   "message": "Use lib/respond.",
         *   "selector": "NewExpression[callee.name='Response']",
         * },
         */
        {
          "message": "No cross-request state.",
          "selector": "Program > VariableDeclaration[kind='let']",
        },
      ],
      "security/detect-eval-with-expression": "error",
      "security/detect-unsafe-regex": "error",
      "sonarjs/cyclomatic-complexity": "error",
      "sonarjs/declarations-in-global-scope": "error",
      "sonarjs/expression-complexity": "error",
      "sonarjs/max-lines": "error",
      "sonarjs/max-lines-per-function": "error",
      "sonarjs/max-union-size": "error",
      "sonarjs/nested-control-flow": "error",
      "sonarjs/no-built-in-override": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/no-commented-code": "error",
      "sonarjs/no-for-in-iterable": "error",

      /**
       * `package.json`'s `imports` prefixed with `#` are erroneously identified
       * as "" by SonarJS.
       */
      "sonarjs/no-implicit-dependencies": ["error", { "whitelist": [""] }],
      "sonarjs/no-return-type-any": "error",
      "sonarjs/no-sonar-comments": "error",
      "sonarjs/no-undefined-assignment": "error",
      "sonarjs/no-variable-usage-before-declaration": "error",
      "sonarjs/no-wildcard-import": "error",
      "sonarjs/operation-returning-nan": "error",
      "sonarjs/prefer-immediate-return": "error",
      "sonarjs/prefer-object-literal": "error",
      "sonarjs/unicode-aware-regex": "error",
    },

    "settings": {
      "es-x": {
        "aggressive": true,
      },
      "import-x/extensions": [".js", ".json", ".jsonc"],
      "import-x/resolver-next": [TYPESCRIPT_IMPORT_RESOLVER],
    },
  },

  // TypeScript definition files
  {
    "files": ["src/**/*.d.ts", "src/*.d.ts"],
    "ignores": [".wrangler/", "coverage/", "node_modules/", "worker-configuration.d.ts"],
    "languageOptions": TYPESCRIPT_LANGUAGE_OPTIONS,
    "linterOptions": {
      ...LINTER_OPTIONS,
      "noInlineConfig": true,
    },
    "name": "@quisido/agents-d-ts",

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
