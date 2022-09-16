module.exports = {
  extends: ['@monorepo-template/eslint-config/react-module'],
  root: false,

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  rules: {
    '@typescript-eslint/no-duplicate-imports': 'off', // deprecated
    '@typescript-eslint/no-parameter-properties': 'off', // deprecated
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/sort-type-union-intersection-members': 'off', //deprecated
    'react/jsx-props-no-spreading': 'off',
  },
};
