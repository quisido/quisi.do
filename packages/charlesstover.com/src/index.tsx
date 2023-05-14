import { StrictMode } from 'react';
import './constants/open-telemetry-provider';
import ROOT from './constants/root';
import App from './features/app';
import fetch from './utils/fetch';
import handleCloudflareAnalyticsRequest from './utils/handle-cloudflare-analytics-request';
import handleUptimeChecksRequest from './utils/handle-uptime-checks-request';
import RumMetrics from './utils/rum-metrics';
import SentryProjectIssues from './utils/sentry-project-issues';

const rumMetrics: RumMetrics = new RumMetrics({
  accessKey: '0123-4567-89ab-cdef',
  fetch(): never {
    throw new Error('Real User Monitoring is currently disabled.');
  },
});

const sentryProjectIssues: SentryProjectIssues = new SentryProjectIssues({
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
      onSentryProjectIssuesRequest={sentryProjectIssues.handleRequest}
      onUptimeChecksRequest={handleUptimeChecksRequest}
    />
  </StrictMode>,
);
