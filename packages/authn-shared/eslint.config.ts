import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import { type Config } from 'eslint/config';

const CONFIG: readonly Config[] = defineConfig(
  ...configs,

  ...disableRulesForFiles({
    'capitalized-comments': ['src/error-code.ts'],
  }),
);

export default CONFIG;
