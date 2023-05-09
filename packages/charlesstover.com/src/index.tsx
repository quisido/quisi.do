import { StrictMode } from 'react';
import ROOT from './constants/root';
import App from './features/app';
import RumMetrics from './utils/rum-metrics';
import './constants/open-telemetry-provider';
import type SentryProjectEvent from './types/sentry-project-event';
import handleCloudflareAnalyticsRequest from './utils/handle-cloudflare-analytics-request';
import handleUptimeChecksRequest from './utils/handle-uptime-checks-request';
import isSentryError from './utils/is-sentry-error';
import validateSentryProjectEvents from './utils/validate-sentry-project-events';

const RUM_METRICS_ACCESS_KEY = '0123-4567-89ab-cdef';

const rumMetrics: RumMetrics = new RumMetrics({
  accessKey: RUM_METRICS_ACCESS_KEY,
  fetch(): never {
    throw new Error('Real User Monitoring is currently disabled.');
  },
});

const SENTRY_ORGANIZATION_SLUG = 'charles-stover';
const SENTRY_PROJECT_SLUG = 'charlesstover-com';
const SENTRY_AUTH_TOKEN =
  '192f445838294027957a4a7d64d5d023a46ce6bfdee3453c820c289e4dcc1f53';

const SENTRY_REQUEST_INIT: RequestInit = {
  headers: new Headers({
    Authorization: `Bearer ${SENTRY_AUTH_TOKEN}`,
  }),
};

const handleSentryProjectEventsRequest = async (): Promise<
  readonly SentryProjectEvent[]
> => {
  const response: Response = await window.fetch(
    `https://sentry.io/api/0/projects/${SENTRY_ORGANIZATION_SLUG}/${SENTRY_PROJECT_SLUG}/events/?full=true`,
    SENTRY_REQUEST_INIT,
  );

  const json: unknown = await response.json();
  if (isSentryError(json)) {
    throw new Error(json.detail);
  }

  return validateSentryProjectEvents(json);
};

ROOT.render(
  <StrictMode>
    <App
      onCloudflareAnalyticsRequest={handleCloudflareAnalyticsRequest}
      onRumMetricsRequest={rumMetrics.handleRequest}
      onSentryProjectEventsRequest={handleSentryProjectEventsRequest}
      onUptimeChecksRequest={handleUptimeChecksRequest}
    />
  </StrictMode>,
);
