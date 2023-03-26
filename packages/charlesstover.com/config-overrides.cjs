const {
  default: cypressConfigOverride,
} = require('@monorepo-template/cypress-coverage-config-override');
const compose = require('compose-function');
const { join } = require('path');

const DEVELOPMENT_TSCONFIG_PATH = join(__dirname, 'tsconfig.development.json');
const PRODUCTION_TSCONFIG_PATH = join(__dirname, 'tsconfig.production.json');

const filterWarningBySourceMapLoader = warning =>
  typeof warning.details === 'string' &&
  warning.details.includes('Error: Failed to parse source map from ') &&
  warning.details.includes('Error: ENOENT: no such file or directory, open ') &&
  warning.details.includes('source-map-loader');

const ignoreSourceMapLoaderWarnings = config => ({
  ...config,
  ignoreWarnings: [
    ...(config.ignoreWarnings ?? []),
    filterWarningBySourceMapLoader,
  ],
});

module.exports = {
  paths: (paths, env) => {
    // Production
    if (env !== 'development') {
      return {
        ...paths,
        appTsConfig: PRODUCTION_TSCONFIG_PATH,
      };
    }

    // Development
    return {
      ...paths,
      appTsConfig: DEVELOPMENT_TSCONFIG_PATH,
    };
  },

  webpack: (config, env) => {
    // Production
    if (env !== 'development') {
      return compose(ignoreSourceMapLoaderWarnings)(config);
    }

    // Development
    return compose(
      cypressConfigOverride,
      ignoreSourceMapLoaderWarnings,
    )(config);
  },
};
