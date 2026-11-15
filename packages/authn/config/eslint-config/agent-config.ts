import type { ConfigObject } from "eslint/config";
import { DISABLED_BUILTIN_RULES } from "./disabled-builtin-rules.js";
import { DISABLED_TYPESCRIPT_RULES } from "./disabled-typescript-rules.js";
import { LINTER_OPTIONS } from "./linter-options.js";
import { TYPESCRIPT_LANGUAGE_OPTIONS } from "./typescript-language-option.js";
import { TYPESCRIPT_PLUGIN } from "./typescript-plugin.js";
import stylisticPlugin from "@stylistic/eslint-plugin";

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
      "@stylistic": stylisticPlugin,
      "@typescript-eslint": TYPESCRIPT_PLUGIN,
    },
    "rules": {
      ...DISABLED_BUILTIN_RULES,
      ...DISABLED_TYPESCRIPT_RULES,
      "@stylistic/padded-blocks": ["warn", "never"],
      "no-global-assign": "error",
      "no-shadow-restricted-names": "error",
      // This is safe due to `no-global-assign` and `no-shadow-restricted-names`.
      "no-undefined": "off",
    },
  },
];
