const cypressConfigOverride = require('@monorepo-template/cypress-coverage-config-override');

module.exports = function override(config, env) {
  if (env !== 'development') {
    return config;
  }

  return cypressConfigOverride(config);
};
