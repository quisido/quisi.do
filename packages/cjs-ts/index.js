const PLUGINS = require('./src/plugins.js');
const PRESETS = require('./src/presets.js');

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
