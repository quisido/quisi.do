import * as tsParser from '@typescript-eslint/parser';
import type { ESLintLanguageOptions } from './eslint-language-options.js';
import { LANGUAGE_OPTIONS } from './language-options.js';
import { TYPESCRIPT_PARSER_OPTIONS } from './typescript-parser-options.js';

export const TYPESCRIPT_LANGUAGE_OPTIONS: Required<ESLintLanguageOptions> = {
  ...LANGUAGE_OPTIONS,
  ecmaVersion: 'latest',
  globals: {},
  parser: tsParser,
  parserOptions: TYPESCRIPT_PARSER_OPTIONS,
  sourceType: 'module',
};
