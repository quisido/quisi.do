module.exports = {
  extends: ['@monorepo-template/eslint-config/react-module'],
  root: false,

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  overrides: [
    {
      files: ['src/test/constants/module-name-mapper.js'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],

  rules: {
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
