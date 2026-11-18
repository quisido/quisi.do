import type { RuleDefinition, RulesConfig } from "@eslint/core";
import type { DeepReadonly } from "@lib/deep-readonly.js";

type PluginRules = Readonly<Record<string, Readonly<RuleDefinition>>>;

const toRulesConfig = (
  rulesConfig: DeepReadonly<RulesConfig>,
  ruleId: string,
): DeepReadonly<RulesConfig> => ({
  ...rulesConfig,
  // Auto-fix applies to `warn` without blocking if auto-fix fails.
  [ruleId]: "warn",
});

export const toFixable = (
  rules: PluginRules,
  prefix?: string,
): DeepReadonly<RulesConfig> => {

  const fixableRules = new Set<string>();

  for (const [
    ruleId,
    { "meta": { deprecated = false, fixable } = {} },
  ] of Object.entries(rules)) {

    if (deprecated !== false || fixable === undefined) {

      continue;

    }

    if (prefix === undefined) {

      fixableRules.add(ruleId);

    } else {

      fixableRules.add(`${prefix}/${ruleId}`);

    }

  }

  return [...fixableRules].reduce(toRulesConfig, {});

};
