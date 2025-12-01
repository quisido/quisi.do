import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import type { Config } from 'eslint/config';

const FLAT_CONFIG: Config[] = defineConfig(
  ...configs,

  {
    ignores: ['packages/**'],
  },

  {
    rules: {
      'max-statements': 'off',
    },
  },

  ...disableRulesForFiles({
    '@typescript-eslint/only-throw-error': [
      'scripts/utils/npm-exec-workspace.ts',
    ],
    'no-plusplus': ['scripts/utils/retry.ts'],
    'no-useless-assignment': ['scripts/utils/retry.ts'],
  }),
);

export default FLAT_CONFIG;
