/// <reference types="cypress" />

const getScreenshotsFolder = (): string => {
  const subfolder = process.env['CYPRESS_SCREENSHOTS_SUBFOLDER'];
  if (typeof subfolder === 'undefined') {
    return 'cypress/screenshots';
  }
  return `cypress/screenshots/${subfolder}`;
};

export default {
  defaultCommandTimeout: 30000,
  experimentalInteractiveRunEvents: true,
  // experimentalMemoryManagement: true,
  // experimentalModifyObstructiveThirdPartyCode: true,
  // experimentalSourceRewriting: true,
  // experimentalWebKitSupport: true,
  fixturesFolder: false,
  projectId: 'fahz48',
  redirectionLimit: 2,
  screenshotsFolder: getScreenshotsFolder(),

  e2e: {
    baseUrl: 'http://localhost:3000/',
    // experimentalOriginDependencies: true,
    experimentalRunAllSpecs: true,
    // experimentalStudio: true,
    specPattern: 'src/**/*.e2e.ts',
    setupNodeEvents(
      _on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ): Cypress.PluginConfigOptions {
      // require('@monorepo-template/cypress-coverage-plugin')(on, config);
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
} satisfies Cypress.ConfigOptions;
