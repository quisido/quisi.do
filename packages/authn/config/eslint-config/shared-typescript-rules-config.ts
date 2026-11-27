import type { RulesConfig } from "@eslint/core";

export const SHARED_TYPESCRIPT_RULES_CONFIG: RulesConfig = {
  // "array" (default) is incompatible with `@stylistic/no-extra-parens`.
  "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],
  "@typescript-eslint/consistent-type-assertions": ["error", { "assertionStyle": "never" }],
  // Replaced by `max-params`.
  "@typescript-eslint/max-params": "off",

  /**
   * The ESLint rule is incorrect here when it throws "Explicit undefined is
   * unnecessary on an optional parameter." The rule does not allow for
   * `f(x?: X | undefined)` to be called with `f(undefined)`.
   */
  "@typescript-eslint/no-duplicate-type-constituents": [
    "error",
    { "ignoreUnions": true },
  ],

  /**
   * Until this rule can be disabled for exports, it is incompatible with
   * `isolatedDeclarations`, e.g. `export const x: string = 'hello';`.
   */
  "@typescript-eslint/no-inferrable-types": "off",
  "@typescript-eslint/no-invalid-this": "error",
  // Replaced by `no-magic-numbers`.
  "@typescript-eslint/no-magic-numbers": "off",
  "@typescript-eslint/no-shadow": "error",
  // Replaced by `no-use-before-define`.
  "@typescript-eslint/no-use-before-define": "off",
  "@typescript-eslint/prefer-nullish-coalescing": "error",
  "@typescript-eslint/prefer-optional-chain": "error",
  "@typescript-eslint/strict-boolean-expressions": "error",
  "@typescript-eslint/switch-exhaustiveness-check": "error",
  "curly": ["error", "all"],
  // Exhaustive `switch`es do not require a default case.
  "default-case": "off",

  /**
   * TypeScript requirement: Property 'X' comes from an index signature, so
   * it must be accessed with ['X'].
   */
  "dot-notation": "off",
  "eqeqeq": "error",
  // This rule is incompatible with numeric TypeScript enums.
  "es-x/no-nonstandard-number-prototype-properties": "off",
  "eslint-comments/no-aggregating-enable": "error",
  "eslint-comments/no-duplicate-disable": "error",
  "eslint-comments/no-unlimited-disable": "error",
  "eslint-comments/no-unused-disable": "error",
  "eslint-comments/no-unused-enable": "error",
  "import-x/avoid-barrel-files": "error",
  // Some dependencies are vended as namespaces.
  "import-x/avoid-namespace-import": "off",
  "import-x/avoid-re-export-all": "error",
  "import-x/default": "error",
  "import-x/export": "error",
  // `import-x/extensions` throws an error when importing files with `.d.ts`.
  "import-x/extensions": "off",
  "import-x/named": "error",
  "import-x/no-absolute-path": "error",
  "import-x/no-amd": "error",
  "import-x/no-commonjs": "error",
  "import-x/no-cycle": "error",
  "import-x/no-deprecated": "warn",
  "import-x/no-dynamic-require": "error",
  "import-x/no-import-module-exports": "error",
  "import-x/no-mutable-exports": "error",
  "import-x/no-named-as-default": "error",
  "import-x/no-named-as-default-member": "error",
  // Some dependencies are vended as namespaces.
  "import-x/no-namespace": "off",
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

  /** @see https://eslint.org/docs/latest/rules/no-const-assign#handled_by_typescript */
  "no-const-assign": "off",
  "no-constant-binary-expression": ["error", { "checkRelationalComparisons": true }],
  "no-extend-native": "error",
  "no-global-assign": "error",
  "no-param-reassign": "error",
  // Replaced by `@typescript-eslint/no-shadow`.
  "no-shadow": "off",
  "no-shadow-restricted-names": "error",

  /** @see https://eslint.org/docs/latest/rules/no-undef#handled_by_typescript */
  "no-undef": "off",

  /**
   * This is safe due to `no-global-assign` and
   * `no-shadow-restricted-names`.
   */
  "no-undefined": "off",

  /** @see https://eslint.org/docs/latest/rules/no-unreachable#handled_by_typescript */
  "no-unreachable": "off",
  "no-use-before-define": ["error", {
    "allowNamedExports": false,
    "classes": true,
    "enums": true,
    "ignoreTypeReferences": true,
    "functions": true,
    "typedefs": false,
    "variables": true,
  }],
  "no-var": "error",
  "prefer-const": "error",

  /**
   * Until this rule can be disabled for exports, it is incompatible with
   * `isolatedDeclarations`, e.g. `export const { property } = object;`.
   */
  "prefer-destructuring": "off",
  "promise/catch-or-return": "error",
  "promise/no-return-wrap": "error",
  "promise/spec-only": "error",
  "promise/valid-params": "error",
  "require-unicode-regexp": "error",
  "use-isnan": ["error", { "enforceForIndexOf": true }],
};
