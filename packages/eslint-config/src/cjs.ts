import JS from './js.js';
import defineConfig from './define-config.js';
import { LINTER_OPTIONS } from './linter-options.js';

export default defineConfig({
  ...JS,
  extends: [],
  files: ['**/*.cjs'],
  ignores: [],

  languageOptions: {
    ...JS.languageOptions,
    globals: {
      module: 'writable',
      require: 'writable',
    },
  },
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/cjs',
});
