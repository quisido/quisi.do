import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,

  {
    files: [
      'src/components/provider/hooks/use-load-translations.ts',
      'src/components/provider/provider.hook.ts',
      'src/runnables/runnable-translate-function.ts',
    ],

    rules: {
      'max-lines-per-function': 'off',
      'max-statements': 'off',
    },
  },

  {
    files: ['src/components/provider/provider.hook.test.ts'],
    rules: {
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    },
  },

  {
    files: ['src/runnables/runnable-translate-function.ts'],
    rules: {
      'no-useless-return': 'off',
    },
  },

  {
    files: ['**/*.test.ts'],
    rules: {
      'max-lines-per-function': 'off',
      'no-undefined': 'off',
    },
  },
];
