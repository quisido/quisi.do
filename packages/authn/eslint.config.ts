import type { ConfigObject } from "eslint/config";
import { importX } from "eslint-plugin-import-x";
import { AGENT_CONFIG } from "./config/eslint-config/agent-config.js";
import { HUMAN_CONFIG } from "./config/eslint-config/human-config.js";
import { TYPESCRIPT_IMPORT_RESOLVER } from "./config/eslint-config/typescript-import-resolver.js";
import { LINTER_OPTIONS } from "./config/eslint-config/linter-options.js";
import { TYPESCRIPT_LANGUAGE_OPTIONS } from "./config/eslint-config/typescript-language-option.js";

const CONFIG: readonly ConfigObject[] = [
  { "ignores": ["coverage/", "node_modules/", "worker-configuration.d.ts"] },

  ...HUMAN_CONFIG,
  ...AGENT_CONFIG,

  {
    "files": ["**/*.d.ts", "*.d.ts"],
    "ignores": ["coverage/", "node_modules/", "worker-configuration.d.ts"],
    "languageOptions": TYPESCRIPT_LANGUAGE_OPTIONS,
    "linterOptions": LINTER_OPTIONS,
    "name": "@quisido/d-ts",

    "plugins": {
      "import-x": importX,
    },

    "rules": {
      "import-x/unambiguous": "off",
      "init-declarations": "off",
    },

    "settings": {
      "import-x/extensions": [".js", ".json", ".jsonc"],
      "import-x/resolver-next": [TYPESCRIPT_IMPORT_RESOLVER],
    },
  },
];

export default CONFIG;
