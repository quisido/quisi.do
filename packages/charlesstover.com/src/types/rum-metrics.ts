import type NonSumMetricStats from './non-sum-metric-stats';
import type SumMetricStats from './sum-metric-stats';

interface RumMetrics {
  readonly JsErrorCount: SumMetricStats;
  readonly NavigationFrustratedTransaction: SumMetricStats;
  readonly NavigationSatisfiedTransaction: SumMetricStats;
  readonly NavigationToleratedTransaction: SumMetricStats;
  readonly PerformanceNavigationDuration: NonSumMetricStats;
  readonly SessionCount: SumMetricStats;
  readonly WebVitalsCumulativeLayoutShift: NonSumMetricStats;
  readonly WebVitalsFirstInputDelay: NonSumMetricStats;
  readonly WebVitalsLargestContentfulPaint: NonSumMetricStats;
}

export type { RumMetrics as default };
