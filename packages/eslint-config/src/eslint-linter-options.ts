import type { Linter } from 'eslint';
import type { Compulsory } from './compulsory.js';

export type ESLintLinterOptions = Compulsory<
  Required<Linter.Config>['linterOptions']
>;
