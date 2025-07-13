import config, { disableRulesForFiles } from './dist/index.js';

export default [
  ...config,

  ...disableRulesForFiles({
    '@typescript-eslint/no-non-null-assertion': ['src/define-config.ts'],
  }),
];
