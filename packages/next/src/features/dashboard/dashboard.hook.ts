import { useEffect, useMemo } from 'react';
import EMPTY_ARRAY from '../../constants/empty-array.js';
import useAsyncState from '../../modules/use-async-state/index.js';
import type CloudflareAnalytics from '../../types/cloudflare-analytics.js';
import type CloudflareAnalyticsDatasets from '../../types/cloudflare-analytics-datasets.js';
import type RumMetrics from '../../types/rum-metrics.js';
import type SentryIssue from '../../types/sentry-issue.js';
import type UptimeChecks from '../../types/uptime-checks.js';
import filterSentryNonIssues from './utils/filter-sentry-non-issues.js';
import mapSentryIssueToSimple from './utils/map-sentry-issue-to-simple.js';

interface Props {
  readonly onCloudflareAnalyticsRequest: () => Promise<CloudflareAnalytics>;
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
  readonly onSentryIssuesRequest: () => Promise<readonly SentryIssue[]>;
  readonly onUptimeChecksRequest: () => Promise<UptimeChecks>;
}

interface State {
  readonly cloudflareAnalytics: CloudflareAnalyticsDatasets | undefined;
  readonly cloudflareAnalyticsBudget: number;
  readonly cloudflareAnalyticsError: string | undefined;
  readonly isCloudflareAnalyticsInitiated: boolean;
  readonly isCloudflareAnalyticsLoading: boolean;
  readonly isSentryIssuesInitiated: boolean;
  readonly isSentryIssuesLoading: boolean;
  readonly isUptimeChecksError: boolean;
  readonly isUptimeChecksInitiated: boolean;
  readonly isUptimeChecksLoading: boolean;
  readonly lastUptimeCheckStatus: boolean;
  readonly lastUptimeCheckTimestamp: number;
  readonly sentryIssues: readonly SentryIssue[];
  readonly sentryIssuesError: string | undefined;
  readonly uptimeChecks: UptimeChecks | undefined;
  readonly uptimeErrors: readonly unknown[];
  readonly uptimeMessages: readonly unknown[];
}

const NONE = 0;
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
  onSentryIssuesRequest,
  onUptimeChecksRequest,
}: Props): State {
  // States
  const {
    data: cloudflareAnalytics,
    error: cloudflareAnalyticsError,
    initiated: isCloudflareAnalyticsInitiated,
    loading: isCloudflareAnalyticsLoading,
    request: requestCloudflareAnalytics,
  } = useAsyncState<CloudflareAnalytics>();

  const {
    data: sentryIssues,
    error: sentryIssuesError,
    initiated: isSentryIssuesInitiated,
    loading: isSentryIssuesLoading,
    request: requestSentryIssues,
  } = useAsyncState<readonly SentryIssue[]>();

  const {
    data: uptimeChecks,
    error: uptimeChecksError,
    initiated: isUptimeChecksInitiated,
    loading: isUptimeChecksLoading,
    request: requestUptimeChecks,
  } = useAsyncState<UptimeChecks>();

  // Effects
  useEffect((): void => {
    void requestCloudflareAnalytics(onCloudflareAnalyticsRequest);
  }, [onCloudflareAnalyticsRequest, requestCloudflareAnalytics]);

  useEffect((): void => {
    void requestSentryIssues(onSentryIssuesRequest);
  }, [onSentryIssuesRequest, requestSentryIssues]);

  useEffect((): void => {
    void requestUptimeChecks(onUptimeChecksRequest);
  }, [onUptimeChecksRequest, requestUptimeChecks]);

  const uptimeChecksErrors: readonly unknown[] =
    uptimeChecks?.errors ?? EMPTY_ARRAY;
  return {
    cloudflareAnalytics: cloudflareAnalytics?.datasets,
    cloudflareAnalyticsError,
    isCloudflareAnalyticsInitiated,
    isCloudflareAnalyticsLoading,
    isSentryIssuesInitiated,
    isSentryIssuesLoading,
    isUptimeChecksError: typeof uptimeChecksError !== 'undefined',
    isUptimeChecksInitiated,
    isUptimeChecksLoading,
    sentryIssuesError,
    uptimeChecks,
    uptimeMessages: uptimeChecks ? uptimeChecks.messages : EMPTY_ARRAY,

    cloudflareAnalyticsBudget: cloudflareAnalytics
      ? cloudflareAnalytics.budget
      : NONE,

    /*
    events: useMemo((): readonly string[] => {
      if (sentryProjectEvents === null) {
        return [];
      }

      const mapSentryProjectEventToString = (e: SentryProjectEvent): string =>
        e.title;

      return sentryProjectEvents.map(mapSentryProjectEventToString);
    }, [sentryProjectEvents]),
    */

    lastUptimeCheckStatus: uptimeChecks
      ? uptimeChecks.status === 'ONLINE'
      : true,

    lastUptimeCheckTimestamp: uptimeChecks
      ? uptimeChecks.lastChecked
      : NOT_FOUND,

    sentryIssues: useMemo((): readonly SentryIssue[] => {
      if (typeof sentryIssues === 'undefined') {
        return EMPTY_ARRAY;
      }

      return sentryIssues
        .filter(filterSentryNonIssues)
        .map(mapSentryIssueToSimple);
    }, [sentryIssues]),

    uptimeErrors: useMemo((): readonly unknown[] => {
      const newUptimeErrors: unknown[] = [];

      if (typeof uptimeChecksError !== 'undefined') {
        newUptimeErrors.push(uptimeChecksError);
      }

      for (const err of uptimeChecksErrors) {
        newUptimeErrors.push(err);
      }

      return newUptimeErrors;
    }, [uptimeChecksError, uptimeChecksErrors]),
  };
}
