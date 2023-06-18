module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jsx-a11y/strict',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    '@monorepo-template/eslint-config/react-fixable',
    '@monorepo-template/eslint-config/react-strict',
    '@monorepo-template/eslint-config/react-typescript',
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
        '@monorepo-template/eslint-config/react-typescript/json',
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
    project: ['./tsconfig.eslint.json', './tsconfig.eslint.cypress.json'],
    tsconfigRootDir: __dirname,
  },

  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'prettier',
    'react',
    'react-hooks',
  ],

  rules: {
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    'react/forbid-component-props': 'off',
    'react/jsx-child-element-spacing': 'off',
    'react/jsx-max-depth': 'off',
    'react/jsx-props-no-spreading': 'off',

    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            from: '**/node_modules/@awsui/components-react/**/*',
            target: './src/features/',
            message:
              'Features may not import from AWS UI directly. Import from src/components instead.',
          },
          {
            from: '**/node_modules/@cloudscape-design/components/**/*',
            target: './src/features/!(spritesheet2gif)/**/*',
            message:
              'Features may not import from Cloudscape Design directly. Import from src/components instead.',
          },
          {
            from: '**/node_modules/@mui/material/**/*',
            target: './src/features/',
            message:
              'Features may not import from MUI directly. Import from src/components instead.',
          },
          {
            from: '**/node_modules/@awsui/components-react/index.js',
            target: '**/*',
            message:
              'You may not import from AWS UI directly. Import from @awsui/components-react/component-name instead.',
          },
          {
            from: '**/node_modules/@mui/material/index.js',
            target: '**/*',
            message:
              'You may not import from MUI directly. Import from @mui/material/ComponentName instead.',
          },
          {
            from: '**/node_modules/@cloudscape-design/components/index.js',
            target: '**/*',
            message:
              'You may not import from Cloudscape Design directly. Import from @awsui/components-react/component-name instead.',
          },
        ],
      },
    ],

    'react/sort-comp': [
      'error',
      {
        order: [
          'constructor',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
  },

  settings: {
    'import/external-module-folders': ['./.yarn/__virtual__', './.yarn/cache'],
    react: {
      version: 'detect',
      linkComponents: [
        {
          linkAttribute: 'to',
          name: 'Link',
        },
      ],
    },
  },
};
