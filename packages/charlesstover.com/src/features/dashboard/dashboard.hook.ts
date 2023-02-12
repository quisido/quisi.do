import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import useAsyncState from '../../modules/use-async-state';
import type CloudflareAnalytics from '../../types/cloudflare-analytics';
import type RumMetrics from '../../types/rum-metrics';
import type UptimeChecks from '../../types/uptime-checks';
import mapRecordToSum from './utils/map-record-to-sum';

interface Props {
  readonly onCloudflareAnalyticsRequest: () => Promise<CloudflareAnalytics>;
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
  readonly onUptimeChecksRequest: () => Promise<UptimeChecks>;
}

interface State {
  readonly apdexError: string | null;
  readonly clsP95: number;
  readonly clsTm95: number;
  readonly cloudflareAnalyticsBudget: number;
  readonly cloudflareAnalyticsError: string | null;
  readonly dailySessionCount: number;
  readonly errorCountTimeSeries: Record<string, number>;
  readonly errorsError: string | null;
  readonly fidP95: number;
  readonly fidTm95: number;
  readonly frustratedTimeSeries: Record<string, number>;
  readonly githubWorkflowStatusAlt: string | undefined;
  readonly isApdexInitiated: boolean;
  readonly isApdexLoading: boolean;
  readonly isCloudflareAnalyticsInitiated: boolean;
  readonly isCloudflareAnalyticsLoading: boolean;
  readonly isErrorsInitiated: boolean;
  readonly isErrorsLoading: boolean;
  readonly isUptimeChecksInitiated: boolean;
  readonly isUptimeChecksLoading: boolean;
  readonly isWebVitalsInitiated: boolean;
  readonly isWebVitalsLoading: boolean;
  readonly lastUptimeCheckStatus: boolean;
  readonly lastUptimeCheckTimestamp: number;
  readonly lcpP95: number;
  readonly lcpTm95: number;
  readonly satisfiedTimeSeries: Record<string, number>;
  readonly sessionCountTimeSeries: Record<string, number>;
  readonly toleratedTimeSeries: Record<string, number>;
  readonly uptimeChecks: UptimeChecks | null;
  readonly uptimeChecksError: string | null;
  readonly uptimeErrors: readonly unknown[];
  readonly uptimeMessages: readonly unknown[];
  readonly webVitalsError: string | null;
}

const DAYS_PER_WEEK = 7;
const EMPTY: Record<string, never> = Object.freeze({});
const NONE: readonly never[] = Object.freeze([]);
const NOT_FOUND = -1;

// Additionally, we have access to `PerformanceNavigationDuration`.

/*

Migrate the following properties to Lambda:

---

const BASE = 10;
const MILLISECONDS_PER_SECOND = 1000;

function reduceSecondsTimeSeriesEntriesToMilliseconds<T>(
  record: Record<string, T>,
  [seconds, value]: [string, T],
): Record<string, T> {
  return {
    ...record,
    [parseInt(seconds, BASE) * MILLISECONDS_PER_SECOND]: value,
  };
}

---

Given a time series reported in seconds (e.g. CloudWatch metrics), create a time
  series reported in milliseconds (i.e. timestamps).

function mapSecondsTimeSeriesToMilliseconds(
  record: Record<string, number>,
): Record<string, number> {
  return Object.entries(record).reduce(
    reduceSecondsTimeSeriesEntriesToMilliseconds,
    {},
  );
}

---

const CUMULATIVE_LAYOUT_SHIFT_PRECISION = 2;
const clsPow = Math.pow(BASE, CUMULATIVE_LAYOUT_SHIFT_PRECISION);

{
  clsP95: Math.round(
    mapRecordToSum(cumulativeLayoutShift.p95) * clsPow,
  ) / clsPow,
  clsTm95: Math.round(
    mapRecordToSum(cumulativeLayoutShift.tm95) * clsPow,
  ) / clsPow,
  errorCount: mapSecondsTimeSeriesToMilliseconds(rumMetrics.JsErrorCount.Sum),
  fidP95: mapRecordToSum(firstInputDelay.p95),
  fidTm95: Math.round(mapRecordToSum(firstInputDelay.tm95)),
  frustrated: mapSecondsTimeSeriesToMilliseconds(
    rumMetrics.NavigationFrustratedTransaction.Sum,
  ),
  lcpP95: Math.round(mapRecordToSum(largestContentfulPaint.p95)),
  lcpTm95: Math.round(mapRecordToSum(largestContentfulPaint.tm95)),
  satisfied: mapSecondsTimeSeriesToMilliseconds(
    rumMetrics.NavigationSatisfiedTransaction.Sum,
  ),
  sessionCount: mapSecondsTimeSeriesToMilliseconds(rumMetrics.SessionCount.Sum),
  tolerated: mapSecondsTimeSeriesToMilliseconds(
    rumMetrics.NavigationToleratedTransaction.Sum,
  ),
}

*/

export default function useDashboard({
  onCloudflareAnalyticsRequest,
  onRumMetricsRequest,
  onUptimeChecksRequest,
}: Readonly<Props>): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const {
    data: cloudflareAnalytics,
    error: cloudflareAnalyticsError,
    initiated: isCloudflareAnalyticsInitiated,
    loading: isCloudflareAnalyticsLoading,
  } = useAsyncState(onCloudflareAnalyticsRequest);

  const {
    error: rumMetricsError,
    initiated: isRumMetricsInitiated,
    loading: isRumMetricsLoading,
  } = useAsyncState(onRumMetricsRequest);

  const {
    data: uptimeChecks,
    error: uptimeChecksError,
    initiated: isUptimeChecksInitiated,
    loading: isUptimeChecksLoading,
  } = useAsyncState(onUptimeChecksRequest);

  const sessionCountTimeSeries: Record<string, number> = EMPTY;

  return {
    apdexError: rumMetricsError,
    cloudflareAnalyticsBudget: cloudflareAnalytics
      ? cloudflareAnalytics.budget
      : 0,
    cloudflareAnalyticsError,
    clsP95: 0,
    clsTm95: 0,
    errorCountTimeSeries: EMPTY,
    errorsError: rumMetricsError,
    fidP95: 0,
    fidTm95: 0,
    frustratedTimeSeries: EMPTY,
    githubWorkflowStatusAlt: translate('GitHub workflow status'),
    isApdexInitiated: isRumMetricsInitiated,
    isApdexLoading: isRumMetricsLoading,
    isCloudflareAnalyticsInitiated,
    isCloudflareAnalyticsLoading,
    isErrorsInitiated: isRumMetricsInitiated,
    isErrorsLoading: isRumMetricsLoading,
    isUptimeChecksInitiated,
    isUptimeChecksLoading,
    isWebVitalsInitiated: isRumMetricsInitiated,
    isWebVitalsLoading: isRumMetricsLoading,
    lcpP95: 0,
    lcpTm95: 0,
    satisfiedTimeSeries: EMPTY,
    sessionCountTimeSeries,
    toleratedTimeSeries: EMPTY,
    uptimeChecks,
    uptimeChecksError,
    uptimeErrors: uptimeChecks ? uptimeChecks.errors : NONE,
    uptimeMessages: uptimeChecks ? uptimeChecks.messages : NONE,
    webVitalsError: rumMetricsError,

    dailySessionCount: useMemo(
      (): number =>
        Math.ceil(mapRecordToSum(sessionCountTimeSeries) / DAYS_PER_WEEK),
      [sessionCountTimeSeries],
    ),

    lastUptimeCheckStatus: uptimeChecks
      ? uptimeChecks.status === 'ONLINE'
      : true,

    lastUptimeCheckTimestamp: uptimeChecks
      ? uptimeChecks.lastChecked
      : NOT_FOUND,
  };
}
