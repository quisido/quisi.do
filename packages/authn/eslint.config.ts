import type { ConfigObject } from "eslint/config";
import vitestPlugin from "@vitest/eslint-plugin";
import { AGENT_CONFIG } from "./config/eslint-config/agent-config.js";
import { HUMAN_CONFIG } from "./config/eslint-config/human-config.js";
import { TYPESCRIPT_LANGUAGE_OPTIONS } from "./config/eslint-config/typescript-language-option.js";
import { LINTER_OPTIONS } from "./config/eslint-config/linter-options.js";

const CONFIG: readonly ConfigObject[] = [
  { "ignores": [".wrangler/", "coverage/", "node_modules/", "tsconfig.tsb;uildinfo", "worker-configuration.d.ts"] },

  ...HUMAN_CONFIG,
  ...AGENT_CONFIG,

  // Package-specific rules
  {
    "files": ["test/**/*.test.ts"],
    "languageOptions": TYPESCRIPT_LANGUAGE_OPTIONS,
    "linterOptions": LINTER_OPTIONS,
    "name": "@quisido/authn",
    "plugins": {
      "vitest": vitestPlugin,
    },
    "rules": {
      "vitest/expect-expect": ["error", { "assertFunctionNames": ["assert", "expect", "expectContentType", "expectHeaders", "expectPermanentCache", "expectStatus", "expectUncacheable"] }],
    },
    "settings": {
      "vitest": {
        "typecheck": true,
      },
    },
  },
];

export default CONFIG;
