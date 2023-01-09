import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import useAsyncState from '../../modules/use-async-state';
import type Breadcrumb from '../../types/breadcrumb';
import type Notification from '../../types/notification';
import type RumMetrics from '../../types/rum-metrics';

interface Props {
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
}

interface State {
  readonly apdexError: string | null;
  readonly breadcrumbs: readonly Breadcrumb[];
  readonly cumulativeLayoutShift: Record<string, number>;
  readonly firstInputDelay: Record<string, number>;
  readonly frustrated: Record<string, number>;
  readonly isApdexInitiated: boolean;
  readonly isApdexLoading: boolean;
  readonly largestContentfulPaint: Record<string, number>;
  readonly notifications: readonly Notification[];
  readonly satisfied: Record<string, number>;
  readonly tolerated: Record<string, number>;
}

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

    cumulativeLayoutShift: useMemo((): Record<string, number> => {
      if (rumMetrics === null) {
        return {};
      }
      return rumMetrics.WebVitalsCumulativeLayoutShift.average;
    }, [rumMetrics]),

    firstInputDelay: useMemo((): Record<string, number> => {
      if (rumMetrics === null) {
        return {};
      }
      return rumMetrics.WebVitalsFirstInputDelay.average;
    }, [rumMetrics]),

    frustrated: useMemo((): Record<string, number> => {
      if (rumMetrics === null) {
        return {};
      }
      return rumMetrics.NavigationFrustratedTransaction.average;
    }, [rumMetrics]),

    largestContentfulPaint: useMemo((): Record<string, number> => {
      if (rumMetrics === null) {
        return {};
      }
      return rumMetrics.WebVitalsLargestContentfulPaint.average;
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
        return {};
      }
      return rumMetrics.NavigationSatisfiedTransaction.average;
    }, [rumMetrics]),

    tolerated: useMemo((): Record<string, number> => {
      if (rumMetrics === null) {
        return {};
      }
      return rumMetrics.NavigationToleratedTransaction.average;
    }, [rumMetrics]),
  };
}
