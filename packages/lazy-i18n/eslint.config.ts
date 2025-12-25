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
    '@typescript-eslint/no-floating-promises': [
      'src/utils/create-new-items.ts',
      'src/utils/replace-variables.tsx',
    ],

    '@typescript-eslint/no-unnecessary-type-assertion': [
      'src/components/provider/provider.hook.test.ts',
    ],

    'func-style': ['src/**/*.tsx'],
    'no-magic-numbers': ['src/components/loading-dot/loading-dot.view.tsx'],
    'no-useless-return': ['src/runnables/runnable-translate-function.ts'],

    'react-compiler/react-compiler': [
      'src/components/provider/provider.hook.ts',
    ],
  }),
);

export default CONFIG;
