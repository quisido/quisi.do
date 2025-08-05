import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';

export default defineConfig(
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
