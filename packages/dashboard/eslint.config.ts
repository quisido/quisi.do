import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import type { Config } from 'eslint/config';

const CONFIG: readonly Config[] = defineConfig(
  ...configs,

  ...disableRulesForFiles({
    complexity: [
      'src/datadog-aggregate-rum-events/datadog-rum-api.ts',
      'src/features/handle-fetch.ts',
      'src/handle-metric.ts',
    ],
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

export default CONFIG;
