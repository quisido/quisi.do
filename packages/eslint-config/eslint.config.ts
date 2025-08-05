import config, { disableRulesForFiles } from './src/index.js';

export default [
  ...config,

  ...disableRulesForFiles({
    '@typescript-eslint/no-non-null-assertion': ['src/define-config.ts'],
  }),
];
