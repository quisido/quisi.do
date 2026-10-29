import { type Linter } from 'eslint';
import { type Compulsory } from './compulsory.js';

export type ESLintECMAFeatures = Compulsory<
  Linter.ParserOptions['ecmaFeatures']
>;
