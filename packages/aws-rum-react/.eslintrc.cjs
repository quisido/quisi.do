module.exports = {
  extends: ['@monorepo-template/eslint-config/react-module'],
  root: false,

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  rules: {
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
