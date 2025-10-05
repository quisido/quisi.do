import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';

export default defineConfig(
  ...configs,

  ...disableRulesForFiles({
    complexity: ['src/handle-metric.ts'],
    'no-await-in-loop': ['src/utils/map-readable-stream-to-string.ts'],
  }),

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'max-lines': 'warn',
      'max-lines-per-function': 'warn',
      'max-params': 'warn',
      'max-statements': 'warn',
      // The `queries` function uses numbers as a generic.
      'no-magic-numbers': 'off',
    },
  },
);
