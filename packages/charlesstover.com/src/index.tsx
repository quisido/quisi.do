import { StrictMode } from 'react';
import './constants/open-telemetry-provider';
import ROOT from './constants/root';
import App from './features/app';
import fetch from './utils/fetch';
import handleCloudflareAnalyticsRequest from './utils/handle-cloudflare-analytics-request';
import handleUptimeChecksRequest from './utils/handle-uptime-checks-request';
import RumMetrics from './utils/rum-metrics';
import SentryProjectEvents from './utils/sentry-project-events';

const rumMetrics: RumMetrics = new RumMetrics({
  accessKey: '0123-4567-89ab-cdef',
  fetch(): never {
    throw new Error('Real User Monitoring is currently disabled.');
  },
});

const sentryProjectEvents: SentryProjectEvents = new SentryProjectEvents({
  authToken: '192f445838294027957a4a7d64d5d023a46ce6bfdee3453c820c289e4dcc1f53',
  fetch,
  organizationSlug: 'charles-stover',
  projectSlug: 'charlesstover-com',
});

ROOT.render(
  <StrictMode>
    <App
      onCloudflareAnalyticsRequest={handleCloudflareAnalyticsRequest}
      onRumMetricsRequest={rumMetrics.handleRequest}
      onSentryProjectEventsRequest={sentryProjectEvents.handleRequest}
      onUptimeChecksRequest={handleUptimeChecksRequest}
    />
  </StrictMode>,
);
