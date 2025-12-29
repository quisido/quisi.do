import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import { type Config } from 'eslint/config';

const CONFIG: readonly Config[] = defineConfig(
  ...configs,

  ...disableRulesForFiles({
    complexity: ['src/handle-metric.ts'],
    'no-await-in-loop': ['src/utils/map-readable-stream-to-string.ts'],
  }),

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // The `queries` function uses numbers as a generic.
      'no-magic-numbers': 'off',
    },
  },
);

export default CONFIG;
