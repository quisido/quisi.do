import type { RulesConfig } from "@eslint/core";

export const DISABLED_TYPESCRIPT_RULES: Readonly<RulesConfig> = {

  // "array" (default) is incompatible with `@stylistic/no-extra-parens`.
  "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],

  // Replaced by `max-params`.
  "@typescript-eslint/max-params": "off",

  /**
   * Until this rule can be disabled for exports, it is incompatible with
   * `isolatedDeclarations`, e.g. `export const x: string = 'hello';`.
   */
  "@typescript-eslint/no-inferrable-types": "off",

  // Replaced by `no-magic-numbers`.
  "@typescript-eslint/no-magic-numbers": "off",

  // Replaced by `no-use-before-define`.
  "@typescript-eslint/no-use-before-define": "off",

  // Exhaustive `switch`es do not require a default case.
  "default-case": "off",

  /**
   * TypeScript requirement: Property 'X' comes from an index signature, so
   * it must be accessed with ['X'].
   */
  "dot-notation": "off",

  // `import-x/extensions` throws an error when importing files with `.d.ts`.
  "import-x/extensions": "off",

  // Some dependencies are vended as namespaces.
  "import-x/no-namespace": "off",

  /** @see https://eslint.org/docs/latest/rules/no-const-assign#handled_by_typescript */
  "no-const-assign": "off",

  // Replaced by `@typescript-eslint/no-shadow`.
  "no-shadow": "off",

  /** @see https://eslint.org/docs/latest/rules/no-undef#handled_by_typescript */
  "no-undef": "off",

  /** @see https://eslint.org/docs/latest/rules/no-unreachable#handled_by_typescript */
  "no-unreachable": "off",

  /**
   * Until this rule can be disabled for exports, it is incompatible with
   * `isolatedDeclarations`, e.g. `export const { property } = object;`.
   */
  "prefer-destructuring": "off",
};
