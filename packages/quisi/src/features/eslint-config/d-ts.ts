import defineConfig, { type Config } from './define-config.js';
import fileGlobsByExtension from './file-globs-by-extension.js';
import TS from './ts.js';

const D_TS_CONFIG: Config = defineConfig({
  ...TS,
  files: fileGlobsByExtension('d.ts'),
  ignores: [],
  name: '@quisido/d-ts',

  rules: {
    ...TS.rules,
    'init-declarations': 'off',
  },
});

export default D_TS_CONFIG;
