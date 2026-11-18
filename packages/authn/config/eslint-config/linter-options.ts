import type { LinterOptionsConfig } from "@eslint/core";
import type { DeepReadonly } from "@lib/deep-readonly.js";

export const LINTER_OPTIONS: DeepReadonly<LinterOptionsConfig> = {
  "reportUnusedDisableDirectives": "error",
  "reportUnusedInlineConfigs": "error",
};
