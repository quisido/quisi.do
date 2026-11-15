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
  "prefer-destructuring": "off"
};
