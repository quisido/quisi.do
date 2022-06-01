/// <reference types="cypress" />
import cypressCoveragePlugin from '@monorepo-template/cypress-coverage-plugin';

export default function cypressPlugins(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Cypress.PluginConfigOptions {
  return cypressCoveragePlugin(on, config);
}
