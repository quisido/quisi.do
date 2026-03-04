/// <reference types="@types/node" />
import { type Linter } from 'eslint';
import { cwd } from 'node:process';
import { PARSER_OPTIONS } from './parser-options.js';

export const TYPESCRIPT_PARSER_OPTIONS: Required<Linter.ParserOptions> = {
  ...PARSER_OPTIONS,
  projectService: true,
  tsconfigRootDir: cwd(),
};
