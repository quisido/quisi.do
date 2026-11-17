import type { RuleDefinition } from "@eslint/core";
import tsPlugin from "@typescript-eslint/eslint-plugin";

type PluginRules = Record<string, RuleDefinition>;
type TypeScriptPluginRule = typeof tsPlugin["rules"][string];

const reduceTypeScriptRulesToPluginRules = (rules: PluginRules, [
  ruleId,
  rule,
]: readonly [string, TypeScriptPluginRule]): PluginRules => {

  // @ts-expect-error: `rule.create` uses the wrong parameters and return type.
  rules[ruleId] = rule;

  return rules;

};

export const TYPESCRIPT_PLUGIN_RULES: PluginRules =
  Object.entries(tsPlugin.rules).reduce(reduceTypeScriptRulesToPluginRules, {});
