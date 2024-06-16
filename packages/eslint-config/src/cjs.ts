import type { Linter } from 'eslint';
import JS from './js.js';

export default {
  ...JS,
  files: ['**/*.cjs'],
  name: '@quisido/cjs',

  languageOptions: {
    ...JS.languageOptions,
    globals: {
      module: 'writable',
      require: 'writable',
    },
  },
} satisfies Required<Omit<Linter.FlatConfig, 'ignores' | 'processor'>>;
