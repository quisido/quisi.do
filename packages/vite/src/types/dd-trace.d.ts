/// <reference types="cypress" />

declare module 'dd-trace/ci/cypress/plugin' {
  const datadogTracer: (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions,
  ) => void;

  export default datadogTracer;
}

declare module 'dd-trace/esbuild' {
  import type { PluginOption } from 'vite';

  const ddPlugin: PluginOption;
  export = ddPlugin;
}
