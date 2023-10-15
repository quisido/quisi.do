require('@babel/register')({
  babelrc: false,
  browserslistConfigFile: false,
  cache: false,
  comments: false,
  extensions: ['.ts'],
  ignore: [],
  include: ['**/*.ts'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
});

module.exports = require('./cypressrc.ts').default;
