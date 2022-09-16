module.exports = {
  extends: ['@monorepo-template/eslint-config/react-module'],
  root: false,

  overrides: [
    {
      files: ['src/test/constants/module-name-mapper.js'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  rules: {
    '@typescript-eslint/no-duplicate-imports': 'off', // deprecated
    '@typescript-eslint/no-parameter-properties': 'off', // deprecated
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/sort-type-union-intersection-members': 'off', // deprecated
    'react/jsx-props-no-spreading': 'off',
  },
};
