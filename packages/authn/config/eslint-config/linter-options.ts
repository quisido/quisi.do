import type { LinterOptionsConfig } from "@eslint/core";
import type { ReadonlyDeep } from "@lib/readonly-deep.js";

export const LINTER_OPTIONS: ReadonlyDeep<LinterOptionsConfig> = {
  "reportUnusedDisableDirectives": "error",
  "reportUnusedInlineConfigs": "error",
};
