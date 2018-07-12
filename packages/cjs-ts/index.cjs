const PLUGINS = require('./src/plugins.cjs');
const PRESETS = require('./src/presets.cjs');

require('@babel/register')({
  babelrc: false,
  browserslistConfigFile: false,
  cache: false,
  comments: false,
  extensions: ['.ts'],
  ignore: [],
  include: ['**/*.js', '**/*.ts'],
  plugins: PLUGINS,
  presets: PRESETS,
});
