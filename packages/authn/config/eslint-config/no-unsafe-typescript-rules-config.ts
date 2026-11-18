import type { RulesConfig } from "@eslint/core";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const isUnsafeRule = (ruleId: string): boolean => ruleId.startsWith("no-unsafe-");

const toRulesConfig = (config: RulesConfig, ruleId: string): RulesConfig => {

  config[`@typescript-eslint/${ruleId}`] = "error";
  return config;

};

export const NO_UNSAFE_TYPESCRIPT_RULES_CONFIG: RulesConfig =
  Object.keys(tsPlugin.rules).filter(isUnsafeRule)
    .reduce(toRulesConfig, {});
