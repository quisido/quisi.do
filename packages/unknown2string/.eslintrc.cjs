module.exports = {
  root: false,

  extends: [
    '@monorepo-template/eslint-config/typescript',
    '@monorepo-template/eslint-config/typescript-fixable',
    '@monorepo-template/eslint-config/typescript-strict',
  ],

  overrides: [
    {
      files: ['*.cjs', '*.js', '*.jsx'],
      extends: '@monorepo-template/eslint-config/typescript/cjs',
    },

    {
      files: ['*.cjs', '*.js', '*.jsx', '*.mjs'],
      extends: [
        '@monorepo-template/eslint-config/typescript/js',
        '@monorepo-template/eslint-config/typescript-fixable/js',
      ],
    },

    {
      files: ['*.eslintrc.cjs'],
      extends: '@monorepo-template/eslint-config/typescript/eslint',
    },

    {
      files: ['*.json'],
      extends: [
        '@monorepo-template/eslint-config/typescript/json',
        '@monorepo-template/eslint-config/typescript-fixable/json',
      ],
    },

    {
      files: ['*.ts', '*.tsx'],
      extends: ['@monorepo-template/eslint-config/typescript/ts'],
    },
  ],

  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
