import TS from './ts.js';
import defineConfig from './define-config.js';

export default defineConfig({
  ...TS,
  files: ['**/*.d.ts'],
  ignores: [],
  name: '@quisido/d-ts',

  rules: {
    ...TS.rules,
    'init-declarations': 'off',
  },
});
