import type NonSumMetricStats from './non-sum-metric-stats.js';
import type SumMetricStats from './sum-metric-stats.js';

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
