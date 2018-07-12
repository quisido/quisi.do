'use client';

import { type ReactElement } from 'react';
import Div from '../../components/div.js';
import Link from '../../components/link/index.js';
import Section from '../../components/section.js';
import handleCloudflareAnalyticsRequest from '../../utils/handle-cloudflare-analytics-request.js';
import handleUptimeChecksRequest from '../../utils/handle-uptime-checks-request.js';
import RumMetrics from '../../utils/rum-metrics.js';
import SentryProjectIssues from '../../utils/sentry-project-issues.js';
import CloudflareAnalytics from './components/cloudflare-analytics/index.js';
import SentryIssues from './components/sentry-issues/index.js';
import Status from './components/status/index.js';
import useDashboard from './dashboard.hook.js';

/*
export interface Props {
  readonly onCloudflareAnalyticsRequest: () => Promise<CloudflareAnalyticsType>;
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
  readonly onSentryIssuesRequest: () => Promise<readonly SentryIssue[]>;
  readonly onUptimeChecksRequest: () => Promise<UptimeChecksType>;
}
*/

const rumMetrics: RumMetrics = new RumMetrics({
  accessKey: '0123-4567-89ab-cdef',
  fetch(): never {
    throw new Error('Real User Monitoring is currently disabled.');
  },
});

const sentryProjectIssues: SentryProjectIssues = new SentryProjectIssues({
  authToken: '192f445838294027957a4a7d64d5d023a46ce6bfdee3453c820c289e4dcc1f53',
  fetch,
  organizationSlug: 'quisido',
  projectSlug: 'quisi-do',
});

export default function Dashboard(): ReactElement {
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
    onCloudflareAnalyticsRequest: handleCloudflareAnalyticsRequest,
    onRumMetricsRequest: rumMetrics.handleRequest,
    onSentryIssuesRequest: sentryProjectIssues.handleRequest,
    onUptimeChecksRequest: handleUptimeChecksRequest,
  });

  return (
    <>
      <Section header="quisi.do operational health dashboard">
        <Div element="p">
          This dashboard showcases operational and performance metrics for{' '}
          <Link feature="dashboard" href="/" title="quisi.do">
            quisi.do
          </Link>
          .
        </Div>
      </Section>
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
