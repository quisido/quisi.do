const cypressCoverageConfigOverride =
  require('@monorepo-template/cypress-coverage-config-override').default;

module.exports = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig({ context: { env }, webpackConfig }) {
          if (env !== 'development') {
            return webpackConfig;
          }

          console.log('Applying Cypress coverage config override.');
          return cypressCoverageConfigOverride(webpackConfig);
        },
      },
    },
  ],
};
