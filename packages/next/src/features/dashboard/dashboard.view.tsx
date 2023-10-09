import { type ReactElement } from 'react';
import Container from '../../components/container';
import Div from '../../components/div';
import Link from '../../components/link';
import type CloudflareAnalyticsType from '../../types/cloudflare-analytics';
import type RumMetrics from '../../types/rum-metrics';
import type SentryIssue from '../../types/sentry-issue';
import type UptimeChecksType from '../../types/uptime-checks';
import CloudflareAnalytics from './components/cloudflare-analytics';
import SentryIssues from './components/sentry-issues';
import Status from './components/status';
import useDashboard from './dashboard.hook';

export interface Props {
  readonly onCloudflareAnalyticsRequest: () => Promise<CloudflareAnalyticsType>;
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
  readonly onSentryIssuesRequest: () => Promise<readonly SentryIssue[]>;
  readonly onUptimeChecksRequest: () => Promise<UptimeChecksType>;
}

export default function Dashboard({
  onCloudflareAnalyticsRequest,
  onRumMetricsRequest,
  onSentryIssuesRequest,
  onUptimeChecksRequest,
}: Props): ReactElement {
  const {
    cloudflareAnalytics,
    cloudflareAnalyticsBudget,
    cloudflareAnalyticsError,
    isCloudflareAnalyticsInitiated,
    isCloudflareAnalyticsLoading,
    isSentryIssuesInitiated,
    isSentryIssuesLoading,
    isUptimeChecksError,
    isUptimeChecksInitiated,
    isUptimeChecksLoading,
    lastUptimeCheckStatus,
    lastUptimeCheckTimestamp,
    sentryIssues,
    sentryIssuesError,
    uptimeErrors,
    uptimeMessages,
  } = useDashboard({
    onCloudflareAnalyticsRequest,
    onRumMetricsRequest,
    onSentryIssuesRequest,
    onUptimeChecksRequest,
  });

  return (
    <>
      <Container header="Quisi.do operational health dashboard">
        <Div element="p">
          This dashboard showcases operational and performance metrics for{' '}
          <Link category="features/dashboard" href="/" title="Quisi.do">
            Quisi.do
          </Link>
          .
        </Div>
      </Container>
      <Status
        lastUptimeCheckStatus={lastUptimeCheckStatus}
        lastUptimeCheckTimestamp={lastUptimeCheckTimestamp}
        uptimeChecksError={isUptimeChecksError}
        uptimeChecksInitiated={isUptimeChecksInitiated}
        uptimeChecksLoading={isUptimeChecksLoading}
        uptimeErrors={uptimeErrors}
        uptimeMessages={uptimeMessages}
      />
      <CloudflareAnalytics
        budget={cloudflareAnalyticsBudget}
        datasets={cloudflareAnalytics}
        error={cloudflareAnalyticsError}
        initiated={isCloudflareAnalyticsInitiated}
        loading={isCloudflareAnalyticsLoading}
      />
      <SentryIssues
        error={sentryIssuesError}
        initiated={isSentryIssuesInitiated}
        issues={sentryIssues}
        loading={isSentryIssuesLoading}
      />
    </>
  );
}
