import type { Linter } from 'eslint';
import type { Compulsory } from './compulsory.js';

export type ESLintLanguageOptions = Compulsory<
  Linter.Config['languageOptions']
>;
