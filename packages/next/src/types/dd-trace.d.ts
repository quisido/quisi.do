/// <reference types="cypress" />

declare module 'dd-trace/ci/cypress/plugin' {
  const datadogTracer: (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions,
  ) => void;

  export default datadogTracer;
}
