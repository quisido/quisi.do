import defineConfig, { type Config } from './define-config.js';
import fileGlobsByExtension from './file-globs-by-extension.js';
import { JS_CONFIG } from './js.js';
import { LINTER_OPTIONS } from './linter-options.js';

export const CJS_CONFIG: Config = defineConfig({
  ...JS_CONFIG,
  extends: [],
  files: fileGlobsByExtension('cjs'),
  ignores: [],
  languageOptions: {
    ...JS_CONFIG.languageOptions,
    globals: {
      module: 'writable',
      require: 'writable',
    },
  },
  linterOptions: LINTER_OPTIONS,
  name: '@quisido/cjs',
  rules: {
    'import-x/no-commonjs': 'off',
    'import-x/no-unassigned-import': 'off',
    'import-x/unambiguous': 'off',
  },
});
