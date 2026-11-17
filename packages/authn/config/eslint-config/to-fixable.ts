import type { RuleDefinition, RulesConfig } from "@eslint/core";

type PluginRules = Record<string, RuleDefinition>;

const toRulesConfig = (
  rulesConfig: RulesConfig,
  ruleId: string,
): RulesConfig => {

  // Auto-fix applies to `warn` without blocking if auto-fix fails.
  rulesConfig[ruleId] = "warn";

  return rulesConfig;

};

export const toFixable = (rules: PluginRules, prefix?: string): RulesConfig => {

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
