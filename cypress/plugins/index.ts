/// <reference types="cypress" />
import cypressCoveragePlugin from '@monorepo-template/cypress-coverage-plugin';

export default function cypressPlugins(
  on: Cypress.PluginEvents,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  config: Cypress.PluginConfigOptions,
): Cypress.PluginConfigOptions {
  return cypressCoveragePlugin(on, config);
}
