require('cjs-ts');
module.exports = [
  require('../eslint-config/src/js.ts'),
  require('../eslint-config/src/ts.ts'),
  {
    ignores: [
      'dist/',
      'jest/',
    ],
  },
];
