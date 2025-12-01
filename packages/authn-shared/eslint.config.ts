import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import type { Config } from 'eslint/config';

const CONFIG: readonly Config[] = defineConfig(
  ...configs,

  ...disableRulesForFiles({
    'capitalized-comments': ['src/error-code.ts'],

    'no-magic-numbers': [
      'src/analytics-response-code.ts',
      'src/error-code.ts',
      'src/whoami-response-code.ts',
    ],
  }),
);

export default CONFIG;
