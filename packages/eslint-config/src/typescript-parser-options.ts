import type { Linter } from 'eslint';
import { PARSER_OPTIONS } from './parser-options.js';

export const TYPESCRIPT_PARSER_OPTIONS: Required<Linter.ParserOptions> = {
  ...PARSER_OPTIONS,
  project: true,
};
