module.exports = {
  fixturesFolder: false,
  projectId: '4akrvv',
  redirectionLimit: 2,
  e2e: {
    baseUrl: 'http://localhost:3000/',
    specPattern: 'src/**/*.e2e.ts',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
  },
  env: {
    codeCoverageTasksRegistered: true,
  },
};
