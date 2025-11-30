import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import type { Config } from 'eslint/config';

const CONFIG: readonly Config[] = defineConfig(
  ...configs,

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
    '@typescript-eslint/consistent-type-assertions': [
      'src/utils/capitalize.ts',
      'src/utils/map-v2-operation-handlers-to-api.ts',
    ],
    'func-style': [
      'src/**/*.tsx',
      'src/utils/map-v2-operation-handlers-to-api.ts',
    ],
    'new-cap': ['src/utils/map-v2-operation-handlers-to-api.ts'],
    'no-console': ['src/test/expect-to-throw.tsx'],
  }),

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'max-lines-per-function': 'warn',
    },
  },
);

export default CONFIG;
