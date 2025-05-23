import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  {
    ignores: ['packages/**'],
  },

  ...disableRulesForFiles({
    'no-console': ['scripts/publish.ts'],
  }),
];
