import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/no-non-null-assertion': ['src/all-settled-mutable.ts'],

    camelcase: ['test/test-d1-prepared-statement.ts'],

    'func-style': ['src/*.test.ts'],

    'max-classes-per-file': ['src/*.test.ts'],

    'max-lines': ['src/fetch-handler.test.ts', 'src/handler.ts'],

    'max-lines-per-function': [
      'src/create-exported-handler-fetch.ts',
      'src/fetch-handler.ts',
      'src/handler.ts',
    ],

    'max-params': ['src/handler.ts'],

    'max-statements': [
      'src/create-exported-handler-fetch.ts',
      'src/create-exported-handler-fetch.test.ts',
      'src/fetch-handler.ts',
      'src/fetch-handler.test.ts',
      'src/handler.ts',
    ],

    'no-await-in-loop': [
      'src/all-settled-mutable.ts',
      'src/create-exported-handler-fetch.ts',
      'src/map-readable-stream-to-string.ts',
    ],

    'no-console': ['scripts/start.ts'],

    'no-magic-numbers': [
      'src/fetch-handler-trace-parent.test.ts',
      'src/metric.ts',
      'src/modules/trace-parent/constants/trace-flag.ts',
    ],

    'no-undefined': ['src/fetch-handler.ts'],
  }),
];
