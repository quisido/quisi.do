module.exports = {
  extends: ['@monorepo-template/eslint-config/react-module'],

  parserOptions: {
    project: ['./tsconfig.eslint.json', './tsconfig.eslint.cypress.json'],
    tsconfigRootDir: __dirname,
  },

  rules: {
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
  },
};
