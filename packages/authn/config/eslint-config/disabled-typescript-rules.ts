import type { RulesConfig } from "@eslint/core";

export const DISABLED_TYPESCRIPT_RULES: RulesConfig = {

  /**
   * Until this rule can be disabled for exports, it is incompatible with
   * `isolatedDeclarations`, e.g. `export const x: string = 'hello';`.
   */
  "@typescript-eslint/no-inferrable-types": "off",

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

  /**
   * ESLint incorrectly flags shadowing in TypeScript: (1) `enum`s and (2)
   * functions with `this` inside other functions with `this`.
   */
  "no-shadow": "off",

  /** @see https://eslint.org/docs/latest/rules/no-undef#handled_by_typescript */
  "no-undef": "off",

  /**
   * Until this rule can be disabled for exports, it is incompatible with
   * `isolatedDeclarations`, e.g. `export const { property } = object;`.
   */
  "prefer-destructuring": "off",
};
