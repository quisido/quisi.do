import { type ReactElement } from 'react';
import Dashboard from '../../../features/dashboard';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params';

export default function DashboardPage(): ReactElement {
  /*
  return (
    <Dashboard
      onCloudflareAnalyticsRequest={handleCloudflareAnalyticsRequest}
      onRumMetricsRequest={rumMetrics.handleRequest}
      onSentryIssuesRequest={sentryIssues.handleRequest}
      onUptimeChecksRequest={handleUptimeChecksRequest}
    />
  );
  */
  return <Dashboard />;
}
