import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,
  {
    files: [
      'src/utils/get-next-data.test.ts',
      'src/utils/get-next-data.ts',
      'src/utils/init-next-data.ts',
    ],
    rules: {
      'no-underscore-dangle': 'off',
    },
  },
];
