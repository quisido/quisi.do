import type { Linter } from "eslint";
import TS from './ts.js';

export default {
  ...TS,
  files: ['**/*.d.ts'],
  name: '@quisido/dts',
  rules: {
    ...TS.rules,
    'init-declarations': 'off',
  },
} satisfies Required<Omit<Linter.FlatConfig, 'ignores' | 'processor'>>;
