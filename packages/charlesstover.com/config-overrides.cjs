const {
  default: cypressConfigOverride,
} = require('@monorepo-template/cypress-coverage-config-override');
const { join } = require('path');

const DEVELOPMENT_TSCONFIG_PATH = join(__dirname, 'tsconfig.development.json');
const PRODUCTION_TSCONFIG_PATH = join(__dirname, 'tsconfig.production.json');

module.exports = {
  paths: (paths, env) => {
    if (env === 'development') {
      return {
        ...paths,
        appTsConfig: DEVELOPMENT_TSCONFIG_PATH,
      };
    }
    return {
      ...paths,
      appTsConfig: PRODUCTION_TSCONFIG_PATH,
    };
  },

  webpack: (config, env) => {
    if (env !== 'development') {
      return config;
    }
    return cypressConfigOverride(config);
  },
};
