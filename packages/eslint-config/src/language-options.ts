import type { ESLintLanguageOptions } from "./eslint-language-options.js";
import { PARSER_OPTIONS } from "./parser-options.js";

export const LANGUAGE_OPTIONS: Required<Omit<ESLintLanguageOptions, 'parser'>> = {
  ecmaVersion: 'latest' as const,
  globals: {},
  parserOptions: PARSER_OPTIONS,
  sourceType: 'module' as const,
};
