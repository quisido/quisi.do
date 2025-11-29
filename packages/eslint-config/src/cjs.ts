import defineConfig, { type Config } from './define-config.js';
import JS from './js.js';
import { LINTER_OPTIONS } from './linter-options.js';

const CONFIG: Config = defineConfig({
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

export default CONFIG;
