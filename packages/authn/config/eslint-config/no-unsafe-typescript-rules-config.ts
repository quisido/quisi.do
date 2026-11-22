import type { RulesConfig } from "@eslint/core";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";

const isUnsafeRule = (ruleId: string): boolean => ruleId.startsWith("no-unsafe-");

const toRulesConfig = (
  config: ReadonlyDeep<RulesConfig>,
  ruleId: string,
): ReadonlyDeep<RulesConfig> => ({
  ...config,
  [`@typescript-eslint/${ruleId}`]: "error",
});

export const NO_UNSAFE_TYPESCRIPT_RULES_CONFIG: ReadonlyDeep<RulesConfig> =
  Object.keys(tsPlugin.rules).filter(isUnsafeRule)
    .reduce(toRulesConfig, {});
