import typescriptRawPlugin from "@typescript-eslint/eslint-plugin/use-at-your-own-risk/raw-plugin";
import type { RulesConfig } from "@eslint/core";
import type { DeepReadonly } from "@lib/deep-readonly.js";

type TypeScriptRawPlugin = DeepReadonly<typeof typescriptRawPlugin>;
type TypeScriptConfig = Exclude<TypeScriptRawPlugin["flatConfigs"][keyof TypeScriptRawPlugin["flatConfigs"]], readonly unknown[]>;

const toRulesConfig = (
  rules: RulesConfig,
  config: TypeScriptConfig,
): Readonly<RulesConfig> => {

  Object.assign(rules, config.rules);
  return rules;

};

export const STRICT_TYPE_CHECKED_RULES_CONFIG: DeepReadonly<RulesConfig> = typescriptRawPlugin.flatConfigs["flat/strict-type-checked"].reduce(toRulesConfig, {});
