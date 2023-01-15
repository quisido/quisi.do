import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import useAsyncState from '../../modules/use-async-state';
import type Breadcrumb from '../../types/breadcrumb';
import type NonSumMetricStats from '../../types/non-sum-metric-stats';
import type Notification from '../../types/notification';
import type RumMetrics from '../../types/rum-metrics';
import mapSecondsTimeSeriesToMilliseconds from './utils/map-seconds-time-series-to-milliseconds';

interface Props {
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
}

interface State {
  readonly apdexError: string | null;
  readonly breadcrumbs: readonly Breadcrumb[];
  readonly cumulativeLayoutShift: NonSumMetricStats;
  readonly errorCount: Record<string, number>;
  readonly firstInputDelay: NonSumMetricStats;
  readonly frustrated: Record<string, number>;
  readonly isApdexInitiated: boolean;
  readonly isApdexLoading: boolean;
  readonly largestContentfulPaint: NonSumMetricStats;
  readonly notifications: readonly Notification[];
  readonly satisfied: Record<string, number>;
  readonly sessionCount: Record<string, number>;
  readonly tolerated: Record<string, number>;
}

const EMPTY: Record<string, never> = Object.freeze({});

const EMPTY_NON_SUM_METRIC_STATS: NonSumMetricStats = Object.freeze({
  p95: EMPTY,
  tm95: EMPTY,
});

/*
Additionally, we have access to `PerformanceNavigationDuration`.
*/

export default function useDashboard({
  onRumMetricsRequest,
}: Readonly<Props>): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const {
    data: rumMetrics,
    error: rumMetricsError,
    initiated: isRumMetricsInitiated,
    loading: isRumMetricsLoading,
  } = useAsyncState(onRumMetricsRequest);

  return {
    apdexError: rumMetricsError,
    isApdexInitiated: isRumMetricsInitiated,
    isApdexLoading: isRumMetricsLoading,

    breadcrumbs: useMemo(
      (): readonly Breadcrumb[] => [
        {
          children: translate('Dashboard') ?? '...',
          path: '/dashboard',
        },
      ],
      [translate],
    ),

    cumulativeLayoutShift: useMemo((): NonSumMetricStats => {
      if (rumMetrics === null) {
        return EMPTY_NON_SUM_METRIC_STATS;
      }
      return rumMetrics.WebVitalsCumulativeLayoutShift;
    }, [rumMetrics]),

    errorCount: useMemo((): Record<string, number> => {
      if (rumMetrics === null) {
        return EMPTY;
      }
      return mapSecondsTimeSeriesToMilliseconds(rumMetrics.JsErrorCount.Sum);
    }, [rumMetrics]),

    firstInputDelay: useMemo((): NonSumMetricStats => {
      if (rumMetrics === null) {
        return EMPTY_NON_SUM_METRIC_STATS;
      }
      return rumMetrics.WebVitalsFirstInputDelay;
    }, [rumMetrics]),

    frustrated: useMemo((): Record<string, number> => {
      if (rumMetrics === null) {
        return EMPTY;
      }
      return mapSecondsTimeSeriesToMilliseconds(
        rumMetrics.NavigationFrustratedTransaction.Sum,
      );
    }, [rumMetrics]),

    largestContentfulPaint: useMemo((): NonSumMetricStats => {
      if (rumMetrics === null) {
        return EMPTY_NON_SUM_METRIC_STATS;
      }
      return rumMetrics.WebVitalsLargestContentfulPaint;
    }, [rumMetrics]),

    notifications: useMemo((): readonly Notification[] => {
      const newNotifications: Notification[] = [];
      if (rumMetricsError !== null) {
        newNotifications.push({
          message: rumMetricsError,
          type: 'error',
        });
      }
      return newNotifications;
    }, [rumMetricsError]),

    satisfied: useMemo((): Record<string, number> => {
      if (rumMetrics === null) {
        return EMPTY;
      }
      return mapSecondsTimeSeriesToMilliseconds(
        rumMetrics.NavigationSatisfiedTransaction.Sum,
      );
    }, [rumMetrics]),

    sessionCount: useMemo((): Record<string, number> => {
      if (rumMetrics === null) {
        return EMPTY;
      }
      return mapSecondsTimeSeriesToMilliseconds(rumMetrics.SessionCount.Sum);
    }, [rumMetrics]),

    tolerated: useMemo((): Record<string, number> => {
      if (rumMetrics === null) {
        return EMPTY;
      }
      return mapSecondsTimeSeriesToMilliseconds(
        rumMetrics.NavigationToleratedTransaction.Sum,
      );
    }, [rumMetrics]),
  };
}
