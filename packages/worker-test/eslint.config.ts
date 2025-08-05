import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';

export default defineConfig(
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/unbound-method': ['src/test-exported-handler.ts'],
    'func-style': ['src/test-exported-handler.test.ts'],
    'max-classes-per-file': ['src/test-exported-handler.test.ts'],
    'max-statements': ['src/test-exported-handler.ts'],
  }),
);
