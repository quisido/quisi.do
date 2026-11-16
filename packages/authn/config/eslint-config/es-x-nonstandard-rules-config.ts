import type { RulesConfig } from "@eslint/core";
import ecmaScriptSyntaxPlugin from "eslint-plugin-es-x";

const isNonStandardRule = (ruleName: string) => ruleName.startsWith("no-nonstandard-");

const toRulesConfig = (config: RulesConfig, ruleName: string) => {

  config[`es-x/${ruleName}`] = "error";
  return config;

};


/**
 * Disallow features that are not defined in ECMAScript. Not included in any
 * `es-x` preset.
 * @see https://eslint-community.github.io/eslint-plugin-es-x/rules/#non-standards
 */
export const ES_X_NONSTANDARD_RULES_CONFIG: RulesConfig =
  Object.keys(ecmaScriptSyntaxPlugin.rules).filter(isNonStandardRule)
    .reduce(toRulesConfig, {});
