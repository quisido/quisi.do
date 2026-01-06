import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { type Config } from 'eslint/config';

const CONFIG: readonly Config[] = defineConfig(
  ...configs,

  // NodeJS
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },

  // Plugins: react-compiler, react-hooks, react-refresh
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react-compiler': reactCompiler,
      'react-hooks': {
        ...reactHooks,
        configs: {},
      },
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': 'error',
    },
  },

  ...disableRulesForFiles({
    '@typescript-eslint/no-deprecated': [
      'src/utils/map-navigator-to-semantic-resource-attributes.ts',
    ],
    '@typescript-eslint/no-empty-object-type': ['src/vite-env.d.ts'],
    '@typescript-eslint/no-explicit-any': [
      'src/modules/react-google-charts/chart.ts',
    ],
    '@typescript-eslint/no-non-null-assertion': ['src/utils/split.ts'],
    '@typescript-eslint/no-unused-vars': [
      'src/modules/react-google-analytics/**/*.ts',
    ],
    camelcase: [
      'src/features/header-authenticate-link.tsx',
      'src/hooks/use-effect-event.ts',
      'src/hooks/use-emit/utils/create-sentry-event.ts',
      'src/modules/react-google-analytics/**/*.ts',
    ],
    complexity: [
      'src/utils/is-dashboard-api-response.ts',
      'src/utils/map-authn-error-code-to-notification.tsx',
      'src/utils/map-oscpu-to-name.ts',
    ],
    'func-style': ['src/**/*.tsx'],
    'id-length': [
      'src/features/clarity.ts',
      'src/modules/react-intercom/utils/create-intercom.ts',
      'src/types/clarity-api.ts',
    ],
    'no-magic-numbers': [
      'src/constants/*.ts',
      'src/modules/quisi/heading-level.ts',
      'src/modules/react-google-charts/chart-options.ts',
      'src/types/log-rocket.ts',
      'src/types/sentry-fullstory-client.ts',
    ],
    'no-undefined': [
      'src/hooks/use-emit/use-emit.ts',
      'src/hooks/use-google-analytics.ts',
      'src/modules/use-async-state/hooks/use-async-state.ts',
      'src/modules/use-async-state/hooks/use-get-state.ts',
    ],
    'no-useless-return': [
      'src/utils/map-navigator-to-semantic-resource-attributes.ts',
    ],
    'prefer-rest-params': [
      'src/features/clarity.ts',
      'src/modules/react-google-analytics/**/*.ts',
    ],
    'react-refresh/only-export-components': ['src/app/**/page.tsx'],
  }),
);

export default CONFIG;
