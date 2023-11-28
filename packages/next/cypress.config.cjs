const { defineConfig } = require('cypress');

const getScreenshotsFolder = () => {
  const subfolder = process.env.CYPRESS_SCREENSHOTS_SUBFOLDER;
  if (typeof subfolder === 'undefined') {
    return 'cypress/screenshots';
  }
  return `cypress/screenshots/${subfolder}`;
};

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  experimentalInteractiveRunEvents: true,
  // experimentalMemoryManagement: true,
  // experimentalModifyObstructiveThirdPartyCode: true,
  // experimentalSourceRewriting: true,
  // experimentalWebKitSupport: true,
  fixturesFolder: false,
  projectId: 'kqcybg',
  redirectionLimit: 2,
  screenshotsFolder: getScreenshotsFolder(),

  e2e: {
    baseUrl: 'http://localhost:3000/',
    // experimentalOriginDependencies: true,
    experimentalRunAllSpecs: true,
    // experimentalStudio: true,
    specPattern: 'src/**/*.e2e.ts',
    setupNodeEvents(on, config) {
      require('@monorepo-template/cypress-coverage-plugin')(on, config);
      return config;
    },
  },

  env: {
    codeCoverageTasksRegistered: true,
  },

  retries: {
    openMode: 0,
    runMode: 2,
  },
});
