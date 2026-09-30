import defineConfig, { type Config } from './define-config.js';
import fileGlobsByExtension from './file-globs-by-extension.js';
import { TS_CONFIG } from './ts.js';

export const D_TS_CONFIG: Config = defineConfig({
  ...TS_CONFIG,
  files: fileGlobsByExtension('d.ts'),
  ignores: [],
  name: '@quisido/d-ts',

  rules: {
    ...TS_CONFIG.rules,
    'import-x/unambiguous': 'off',
    'init-declarations': 'off',
  },
});
