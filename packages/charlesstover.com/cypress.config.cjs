const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  fixturesFolder: false,
  projectId: 'fahz48',
  redirectionLimit: 2,
  e2e: {
    baseUrl: 'http://localhost:3000/',
    specPattern: 'src/**/*.e2e.ts',
    setupNodeEvents(on, config) {
      require('@monorepo-template/cypress-coverage-plugin')(on, config);
      return config;
    },
  },
  env: {
    codeCoverageTasksRegistered: true,
  },
});
