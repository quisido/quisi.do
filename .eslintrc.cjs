module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,

  env: {
    jest: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:cypress/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/strict',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    '@monorepo-template/eslint-config/typescript',
    '@monorepo-template/eslint-config/typescript-fixable',
    '@monorepo-template/eslint-config/typescript-strict',
    '@monorepo-template/eslint-config/react-fixable',
    '@monorepo-template/eslint-config/react-strict',
    '@monorepo-template/eslint-config/react-typescript',
    'prettier',
  ],

  overrides: [
    {
      files: ['.eslintrc.cjs'],
      extends: ['@monorepo-template/eslint-config/typescript/eslint'],
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
    extraFileExtensions: ['.json'],
    project: ['./tsconfig.eslint.json', './cypress/tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
    useJSXTextNode: true,
    warnOnUnsupportedTypeScriptVersion: false,

    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: false,
    },
  },

  plugins: [
    '@typescript-eslint',
    'cypress',
    'import',
    'jsx-a11y',
    'prettier',
    'react',
    'react-hooks',
  ],

  rules: {
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    'react/forbid-component-props': 'off',
    'react/jsx-max-depth': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'react/no-multi-comp': 'off',

    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            from: './.yarn/**/node_modules/@awsui/components-react/**/*',
            message:
              'Features may not import from AWSUI directly. Import from src/components instead.',
            target: './src/features/!(spritesheet2gif)/**/*',
          },
          {
            from: './.yarn/**/node_modules/@mui/material/**/*',
            message:
              'Features may not import from MUI directly. Import from src/components instead.',
            target: './src/features/!(spritesheet2gif)/**/*',
          },
          {
            from: './.yarn/**/node_modules/@awsui/components-react/index.js',
            message:
              'You may not import from AWSUI directly. Import from @awsui/components-react/component-name instead.',
            target: '**/*',
          },
          {
            from: './.yarn/**/node_modules/@mui/material/index.js',
            message:
              'You may not import from MUI directly. Import from @mui/material/ComponentName instead.',
            target: '**/*',
          },
        ],
      },
    ],
  },

  settings: {
    'import/external-module-folders': ['./.yarn/__virtual__', './.yarn/cache'],
    react: {
      version: 'detect',
    },
  },
};
