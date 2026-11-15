import type { RuleContext, RuleDefinition, RuleVisitor } from "@eslint/core";
import tsPlugin from "@typescript-eslint/eslint-plugin";

type PluginRules = Record<string, RuleDefinition>;
type TypeScriptPluginRule = typeof tsPlugin["rules"][string];

const reduceTypeScriptRulesToPluginRules = (rules: PluginRules, [
  ruleId,
  rule,
]: readonly [string, TypeScriptPluginRule]): PluginRules => {

  rules[ruleId] = {
    ...rule,
    create (context: RuleContext): RuleVisitor {

      // @ts-expect-error `value.create` uses the wrong parameters and return type.
      return rule.create(context);

    },
  };

  return rules;

};

export const TYPESCRIPT_PLUGIN_RULES: PluginRules = Object.entries(tsPlugin.rules).reduce(
  reduceTypeScriptRulesToPluginRules,
  {},
);
