import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig(
  ...configs,

  // Plugins: react-compiler, react-hooks, react-refresh
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react-compiler': reactCompiler,
      'react-hooks': reactHooks,
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

    'max-lines-per-function': [
      'src/components/provider/hooks/use-load-translations.ts',
      'src/components/provider/provider.hook.ts',
      'src/runnables/runnable-translate-function.ts',
    ],

    'max-statements': [
      'src/components/provider/hooks/use-load-translations.ts',
      'src/components/provider/provider.hook.ts',
      'src/runnables/runnable-translate-function.ts',
      'src/utils/replace-variables.tsx',
    ],
    'no-magic-numbers': ['src/components/loading-dot/loading-dot.view.tsx'],
    'no-useless-return': ['src/runnables/runnable-translate-function.ts'],

    'react-compiler/react-compiler': [
      'src/components/provider/provider.hook.ts',
    ],
  }),
);
