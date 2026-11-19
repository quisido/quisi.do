import type { RulesConfig } from "@eslint/core";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import type { DeepReadonly } from "@lib/deep-readonly.js";

const isUnsafeRule = (ruleId: string): boolean => ruleId.startsWith("no-unsafe-");

const toRulesConfig = (
  config: DeepReadonly<RulesConfig>,
  ruleId: string,
): DeepReadonly<RulesConfig> => ({
  ...config,
  [`@typescript-eslint/${ruleId}`]: "error",
});

export const NO_UNSAFE_TYPESCRIPT_RULES_CONFIG: DeepReadonly<RulesConfig> =
  Object.keys(tsPlugin.rules).filter(isUnsafeRule)
    .reduce(toRulesConfig, {});
