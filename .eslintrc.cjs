module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  root: true,

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    '@monorepo-template/eslint-config/typescript',
    '@monorepo-template/eslint-config/typescript-fixable',
    '@monorepo-template/eslint-config/typescript-strict',
    'prettier',
  ],

  overrides: [
    {
      files: ['.eslintrc.cjs'],
      extends: '@monorepo-template/eslint-config/typescript/eslint',
    },

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
    extraFileExtensions: ['.json'],
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
};
