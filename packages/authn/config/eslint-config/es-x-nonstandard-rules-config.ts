import type { RulesConfig } from "@eslint/core";
import ecmaScriptSyntaxPlugin from "eslint-plugin-es-x";

const isNonStandardRule = (ruleName: string): boolean => ruleName.startsWith("no-nonstandard-");

const toRulesConfig = (
  config: Readonly<RulesConfig>,
  ruleName: string,
): Readonly<RulesConfig> => ({
  ...config,
  [`es-x/${ruleName}`]: "error",
});


/**
 * Disallow features that are not defined in ECMAScript. Not included in any
 * `es-x` preset.
 * @see https://eslint-community.github.io/eslint-plugin-es-x/rules/#non-standards
 */
export const ES_X_NONSTANDARD_RULES_CONFIG: Readonly<RulesConfig> =
  Object.keys(ecmaScriptSyntaxPlugin.rules).filter(isNonStandardRule)
    .reduce(toRulesConfig, {});
