import configs, { disableRulesForFiles } from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  ...disableRulesForFiles({
    camelcase: ['test/test-d1-prepared-statement.ts'],
    'func-style': ['src/*.test.ts'],
    'max-classes-per-file': ['src/*.test.ts'],
    'max-lines': ['src/fetch-handler.test.ts', 'src/handler.ts'],
    'max-lines-per-function': ['src/exported-handler.ts', 'src/handler.ts'],
    'max-params': ['src/handler.ts'],
    'no-await-in-loop': ['src/map-readable-stream-to-string.ts'],
    'no-console': ['scripts/dev.ts'],

    'max-statements': [
      'src/exported-handler.ts',
      'src/exported-handler.test.ts',
      'src/fetch-handler.test.ts',
      'src/handler.ts',
    ],

    'no-magic-numbers': [
      'src/fetch-handler-trace-parent.test.ts',
      'src/metric.ts',
      'src/modules/trace-parent/constants/trace-flag.ts',
    ],
  }),
];
