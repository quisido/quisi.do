module.exports = {
  extends: ['@monorepo-template/eslint-config/react-module'],
  root: false,

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  rules: {
    'react/jsx-props-no-spreading': 'off',
    'typescript-eslint/prefer-readonly-parameter-types': 'off',
  },
};
