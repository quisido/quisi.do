import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';

export default defineConfig(
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/no-non-null-assertion': ['src/all-settled-mutable.ts'],

    camelcase: ['test/test-d1-prepared-statement.ts'],

    'func-style': ['src/*.test.ts'],

    'max-classes-per-file': ['src/*.test.ts'],

    'no-await-in-loop': [
      'src/all-settled-mutable.ts',
      'src/create-exported-handler-fetch.ts',
      'src/map-readable-stream-to-string.ts',
    ],

    'no-console': ['scripts/start.ts'],

    'no-magic-numbers': [
      'src/*.test.ts',
      'src/metric.ts',
      'src/modules/trace-parent/constants/trace-flag.ts',
    ],

    'no-undefined': ['src/fetch-handler.ts'],
  }),

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'max-lines': 'warn',
      'max-lines-per-function': 'warn',
      'max-params': 'warn',
      'max-statements': 'warn',
    },
  },
);
