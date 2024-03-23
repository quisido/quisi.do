require('@babel/register')({
  babelrc: false,
  browserslistConfigFile: false,
  cache: false,
  comments: false,
  extensions: ['.ts'],
  ignore: [],
  include: ['**/*.js', '**/*.ts'],

  plugins: [
    /**
     *   `@babel/preset-typescript` does not yet support fully-qualified
     * imports.
     */
    [
      'replace-import-extension',
      {
        extMapping: {
          '.js': '.ts',
        },
      },
    ],
  ],

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

module.exports = require('./lighthouse.config.ts').default;
