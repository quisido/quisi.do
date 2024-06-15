import type { Linter } from 'eslint';
import TS from './ts.js';

export default {
  ...TS,
  files: ['**/*.test.ts'],
  ignores: [],
  name: '@quisido/test-ts',

  rules: {
    ...TS.rules,
    'max-lines-per-function': 'off',
    'no-undefined': 'off',
  } satisfies Linter.RulesRecord,
} satisfies Required<Omit<Linter.FlatConfig, 'processor'>>;
