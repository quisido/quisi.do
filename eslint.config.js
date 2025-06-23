import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  {
    ignores: ['packages/**'],
  },

  {
    rules: {
      'max-statements': 'off',
    },
  },

  ...disableRulesForFiles({
    '@typescript-eslint/only-throw-error': [
      'scripts/utils/npm-exec-workspace.ts',
    ],

    'no-console': [
      'scripts/publish.ts',
      'scripts/utils/npm-exec-workspace.ts',
      'scripts/utils/spy-on-console.ts',
    ],

    'no-plusplus': ['scripts/utils/retry.ts'],

    'no-useless-assignment': ['scripts/utils/retry.ts'],
  }),
];
