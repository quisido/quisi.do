import JS from './js.js';
import defineConfig from './define-config.js';
import { LINTER_OPTIONS } from './linter-options.js';

export default defineConfig({
  ...JS,
  extends: [],
  files: ['**/*.cjs'],
  ignores: [],
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/cjs',

  languageOptions: {
    ...JS.languageOptions,
    globals: {
      module: 'writable',
      require: 'writable',
    },
  },
});
