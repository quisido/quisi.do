import { type ReactElement } from 'react';
import Dashboard from '../../../features/dashboard';
import handleCloudflareAnalyticsRequest from '../../../utils/handle-cloudflare-analytics-request';
import handleUptimeChecksRequest from '../../../utils/handle-uptime-checks-request';
import RumMetrics from '../../../utils/rum-metrics';
import SentryProjectIssues from '../../../utils/sentry-project-issues';

const rumMetrics: RumMetrics = new RumMetrics({
  accessKey: '0123-4567-89ab-cdef',
  fetch(): never {
    throw new Error('Real User Monitoring is currently disabled.');
  },
});

const sentryIssues: SentryProjectIssues = new SentryProjectIssues({
  authToken: '192f445838294027957a4a7d64d5d023a46ce6bfdee3453c820c289e4dcc1f53',
  fetch,
  organizationSlug: 'charles-stover',
  projectSlug: 'charlesstover-com',
});

export { default as generateStaticParams } from '../../../features/generate-locale-static-params';

export default function DashboardPage(): ReactElement {
  return (
    <Dashboard
      onCloudflareAnalyticsRequest={handleCloudflareAnalyticsRequest}
      onRumMetricsRequest={rumMetrics.handleRequest}
      onSentryIssuesRequest={sentryIssues.handleRequest}
      onUptimeChecksRequest={handleUptimeChecksRequest}
    />
  );
}
