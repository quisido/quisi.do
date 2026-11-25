import type { RulesConfig } from "@eslint/core";

export const SHARED_BUILTIN_RULES_CONFIG: Readonly<RulesConfig> = {
  // Commented out code may be lowercase.
  "capitalized-comments": "off",

  // Replaced by `@stylistic/indent`.
  "indent": "off",

  // Replaced by `@stylistic/indent`.
  "indent-legacy": "off",

  // Replaced by `@stylistic/max-len`.
  "max-len": "off",

  // Replaced by `import-x'.
  "sort-imports": "off",
};
