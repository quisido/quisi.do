import type { Linter } from "eslint";
import TS from './ts.js';

export default {
  ...TS,
  files: ['**/*.d.ts'],
  ignores: [],
  name: '@quisido/d-ts',

  rules: {
    ...TS.rules,
    'init-declarations': 'off',
  } satisfies Linter.RulesRecord,
} satisfies Required<Omit<Linter.FlatConfig, 'processor'>>;
