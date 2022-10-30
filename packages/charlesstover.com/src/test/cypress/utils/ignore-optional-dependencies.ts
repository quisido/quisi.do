import destroyRequest from './destroy-request';

const OPTIONAL_DEPENDENCY_LOCATIONS = [
  'https://cloudflareinsights.com/',
  'https://o592283.ingest.sentry.io/',
  'https://session-replay.browser-intake-datadoghq.com/',
];

export default function ignoreOptionalDependencies(): void {
  for (const location of OPTIONAL_DEPENDENCY_LOCATIONS) {
    cy.intercept(`${location}*`, destroyRequest);
  }
}
