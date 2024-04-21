import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.FlatConfig[]} */
export default [
  ...configs,
  {
    files: ['src/components/sentry/sentry.hook.ts'],
    rules: {
      camelcase: 'off',
    },
  },
];
