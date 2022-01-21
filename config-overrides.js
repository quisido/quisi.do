const cypressCoverageConfigOverride = require('@monorepo-template/cypress-coverage-config-override');

module.exports = function override(config, env) {
  if (env !== 'development') {
    return config;
  }

  console.log('Applying Cypress coverage config override.');
  return cypressCoverageConfigOverride(config);
};
