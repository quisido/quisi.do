import configs, { disableRulesForFiles } from '@quisido/eslint-config';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactRefresh from 'eslint-plugin-react-refresh';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  {
    plugins: {
      'react-compiler': reactCompiler,
      'react-refresh': reactRefresh,
    },

    rules: {
      'react-compiler/react-compiler': 'error',
      'react-refresh/only-export-components': 'error',
    },
  },

  ...disableRulesForFiles({
    'no-useless-return': ['src/runnables/runnable-translate-function.ts'],

    '@typescript-eslint/no-unnecessary-type-assertion': [
      'src/components/provider/provider.hook.test.ts',
    ],

    'max-lines-per-function': [
      'src/components/provider/hooks/use-load-translations.ts',
      'src/components/provider/provider.hook.ts',
      'src/runnables/runnable-translate-function.ts',
    ],

    'max-statements': [
      'src/components/provider/hooks/use-load-translations.ts',
      'src/components/provider/provider.hook.ts',
      'src/runnables/runnable-translate-function.ts',
    ],

    'react-compiler/react-compiler': [
      'src/components/provider/provider.hook.ts',
    ],
  }),
];
