import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import type { Config } from 'eslint/config';

const CONFIG: readonly Config[] = defineConfig(
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/unbound-method': ['src/test-exported-handler.ts'],
    'func-style': ['src/test-exported-handler.test.ts'],
    'max-classes-per-file': ['src/test-exported-handler.test.ts'],
    'max-statements': ['src/test-exported-handler.ts'],
  }),
);

export default CONFIG;
