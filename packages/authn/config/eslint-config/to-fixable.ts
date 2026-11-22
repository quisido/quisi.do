import type { RuleDefinition, RulesConfig } from "@eslint/core";
import type { ReadonlyDeep } from "@lib/readonly-deep.js";

type PluginRules = Readonly<Record<string, Readonly<RuleDefinition>>>;

const toRulesConfig = (
  rulesConfig: ReadonlyDeep<RulesConfig>,
  ruleId: string,
): ReadonlyDeep<RulesConfig> => ({
  ...rulesConfig,
  // Auto-fix applies to `warn` without blocking if auto-fix fails.
  [ruleId]: "warn",
});

export const toFixable = (
  rules: PluginRules,
  prefix?: string,
): ReadonlyDeep<RulesConfig> => {

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
