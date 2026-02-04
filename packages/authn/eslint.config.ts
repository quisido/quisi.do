import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import { type Config } from 'eslint/config';

const CONFIG: readonly Config[] = defineConfig(
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/no-dynamic-delete': ['src/handle-metric.ts'],
    '@typescript-eslint/unbound-method': ['src/test/test-exported-handler.ts'],
    'capitalized-comments': ['src/constants/metric-name.ts'],
    complexity: [
      'src/analytics/map-analytics-engine-row-index-to-datum-factory.ts',
      'src/handle-metric.ts',
      'src/utils/is-console.ts',
    ],
    'func-style': ['src/features/authn-user-id.ts'],
    'max-classes-per-file': ['src/authn-fetch-handler.ts'],
    'no-await-in-loop': ['src/utils/map-readable-stream-to-string.ts'],
    'no-console': ['src/features/get-console.ts'],
    'no-undefined': [
      'src/routes/patreon/handle-invalid-invalid-patreon-access-token-request-description.ts',
      'src/routes/patreon/handle-invalid-patreon-access-token-request-description.ts',
      'src/routes/patreon/handle-missing-invalid-patreon-access-token-request-description.ts',
    ],
  }),

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      camelcase: 'off',
      'no-undefined': 'off',
    },
  },
);

export default CONFIG;
