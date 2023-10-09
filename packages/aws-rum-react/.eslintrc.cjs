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
    '@typescript-eslint/no-parameter-properties': 'off', // deprecated
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
