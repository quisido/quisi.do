import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';

export default defineConfig(
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

    'no-console': [
      'scripts/publish.ts',
      'scripts/utils/log-command.ts',
      'scripts/utils/spy-on-console.ts',
    ],

    'no-plusplus': ['scripts/utils/retry.ts'],

    'no-useless-assignment': ['scripts/utils/retry.ts'],
  }),
);
