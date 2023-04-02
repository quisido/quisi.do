import type { ReactElement } from 'react';
import Container from '../../components/container';
import Div from '../../components/div';
import Link from '../../components/link';
import type CloudflareAnalyticsType from '../../types/cloudflare-analytics';
import type RumMetrics from '../../types/rum-metrics';
import type UptimeChecksType from '../../types/uptime-checks';
import Apdex from './components/apdex';
import CloudflareAnalyticsComponent from './components/cloudflare-analytics';
import Errors from './components/errors';
import Status from './components/status';
import WebVitals from './components/web-vitals';
import useDashboard from './dashboard.hook';

export interface Props {
  readonly onCloudflareAnalyticsRequest: () => Promise<CloudflareAnalyticsType>;
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
  readonly onUptimeChecksRequest: () => Promise<UptimeChecksType>;
}

export default function Dashboard({
  onCloudflareAnalyticsRequest,
  onRumMetricsRequest,
  onUptimeChecksRequest,
}: Readonly<Props>): ReactElement {
  const {
    apdexError,
    ciCdStatusAlt,
    cloudflareAnalytics,
    cloudflareAnalyticsBudget,
    cloudflareAnalyticsError,
    clsP95,
    clsTm95,
    dailySessionCount,
    errorCountTimeSeries,
    errorsError,
    fidP95,
    fidTm95,
    frustratedTimeSeries,
    isApdexInitiated,
    isApdexLoading,
    isCloudflareAnalyticsInitiated,
    isCloudflareAnalyticsLoading,
    isErrorsInitiated,
    isErrorsLoading,
    isUptimeChecksError,
    isUptimeChecksInitiated,
    isUptimeChecksLoading,
    isWebVitalsInitiated,
    isWebVitalsLoading,
    lastUptimeCheckStatus,
    lastUptimeCheckTimestamp,
    lcpP95,
    lcpTm95,
    satisfiedTimeSeries,
    sessionCountTimeSeries,
    toleratedTimeSeries,
    uptimeErrors,
    uptimeMessages,
    webVitalsError,
  } = useDashboard({
    onCloudflareAnalyticsRequest,
    onRumMetricsRequest,
    onUptimeChecksRequest,
  });

  return (
    <>
      <Container header="CharlesStover.com">
        <Div element="p">
          This dashboard showcases operational and performance metrics for{' '}
          <Link href="/">CharlesStover.com</Link>.
        </Div>
      </Container>
      <Status
        ciCdStatusAlt={ciCdStatusAlt}
        dailySessionCount={dailySessionCount}
        lastUptimeCheckStatus={lastUptimeCheckStatus}
        lastUptimeCheckTimestamp={lastUptimeCheckTimestamp}
        uptimeChecksError={isUptimeChecksError}
        uptimeChecksInitiated={isUptimeChecksInitiated}
        uptimeChecksLoading={isUptimeChecksLoading}
        uptimeErrors={uptimeErrors}
        uptimeMessages={uptimeMessages}
      />
      <Apdex
        error={apdexError}
        frustratedTimeSeries={frustratedTimeSeries}
        initiated={isApdexInitiated}
        loading={isApdexLoading}
        satisfiedTimeSeries={satisfiedTimeSeries}
        toleratedTimeSeries={toleratedTimeSeries}
      />
      <CloudflareAnalyticsComponent
        budget={cloudflareAnalyticsBudget}
        datasets={cloudflareAnalytics}
        error={cloudflareAnalyticsError}
        initiated={isCloudflareAnalyticsInitiated}
        loading={isCloudflareAnalyticsLoading}
      />
      <Errors
        error={errorsError}
        errorCountTimeSeries={errorCountTimeSeries}
        initiated={isErrorsInitiated}
        loading={isErrorsLoading}
        sessionCountTimeSeries={sessionCountTimeSeries}
      />
      <WebVitals
        clsP95={clsP95}
        clsTm95={clsTm95}
        error={webVitalsError}
        fidP95={fidP95}
        fidTm95={fidTm95}
        initiated={isWebVitalsInitiated}
        lcpP95={lcpP95}
        lcpTm95={lcpTm95}
        loading={isWebVitalsLoading}
      />
    </>
  );
}
