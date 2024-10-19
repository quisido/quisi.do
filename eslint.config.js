import configs from '@quisido/eslint-config';

/** @type {readonly import('eslint').Linter.Config[]} */
export default [
  ...configs,

  {
    ignores: ['packages/**'],
  },
];
