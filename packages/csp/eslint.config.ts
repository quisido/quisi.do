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
);

export default CONFIG;
