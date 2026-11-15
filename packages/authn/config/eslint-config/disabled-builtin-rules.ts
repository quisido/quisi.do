import type { RulesConfig } from "@eslint/core";

export const DISABLED_BUILTIN_RULES: RulesConfig = {
  // Commented out code may be lowercase.
  "capitalized-comments": "off",

  // Replaced by `@stylistic/indent`.
  "indent": "off",

  // Replaced by `@stylistic/indent`.
  "indent-legacy": "off",
};
