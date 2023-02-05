import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import useAsyncState from '../../modules/use-async-state';
import type RumMetrics from '../../types/rum-metrics';
import mapRecordToSum from './utils/map-record-to-sum';

interface Props {
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
  readonly onUptimeRequest: () => Promise<unknown>;
}

interface State {
  readonly apdexError: string | null;
  readonly clsP95: number;
  readonly clsTm95: number;
  readonly dailySessionCount: number;
  readonly errorCountTimeSeries: Record<string, number>;
  readonly errorsError: string | null;
  readonly fidP95: number;
  readonly fidTm95: number;
  readonly frustratedTimeSeries: Record<string, number>;
  readonly githubWorkflowStatusAlt: string | undefined;
  readonly isApdexInitiated: boolean;
  readonly isApdexLoading: boolean;
  readonly isErrorsInitiated: boolean;
  readonly isErrorsLoading: boolean;
  readonly isUptimeInitiated: boolean;
  readonly isUptimeLoading: boolean;
  readonly isWebVitalsInitiated: boolean;
  readonly isWebVitalsLoading: boolean;
  readonly lcpP95: number;
  readonly lcpTm95: number;
  readonly satisfiedTimeSeries: Record<string, number>;
  readonly sessionCountTimeSeries: Record<string, number>;
  readonly toleratedTimeSeries: Record<string, number>;
  readonly uptime: unknown;
  readonly uptimeError: string | null;
  readonly webVitalsError: string | null;
}

const DAYS_PER_WEEK = 7;
const EMPTY: Record<string, never> = Object.freeze({});

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
  onRumMetricsRequest,
  onUptimeRequest,
}: Readonly<Props>): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const {
    error: rumMetricsError,
    initiated: isRumMetricsInitiated,
    loading: isRumMetricsLoading,
  } = useAsyncState(onRumMetricsRequest);

  const {
    data: uptime,
    error: uptimeError,
    initiated: isUptimeInitiated,
    loading: isUptimeLoading,
  } = useAsyncState(onUptimeRequest);

  const sessionCountTimeSeries: Record<string, number> = EMPTY;

  return {
    apdexError: rumMetricsError,
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
    isErrorsInitiated: isRumMetricsInitiated,
    isErrorsLoading: isRumMetricsLoading,
    isUptimeInitiated,
    isUptimeLoading,
    isWebVitalsInitiated: isRumMetricsInitiated,
    isWebVitalsLoading: isRumMetricsLoading,
    lcpP95: 0,
    lcpTm95: 0,
    satisfiedTimeSeries: EMPTY,
    sessionCountTimeSeries,
    toleratedTimeSeries: EMPTY,
    uptime,
    uptimeError,
    webVitalsError: rumMetricsError,

    dailySessionCount: useMemo(
      (): number =>
        Math.ceil(mapRecordToSum(sessionCountTimeSeries) / DAYS_PER_WEEK),
      [sessionCountTimeSeries],
    ),
  };
}
