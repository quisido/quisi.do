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
);

export default CONFIG;
