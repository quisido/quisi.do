type RumMetricKey =
  | 'JsErrorCount'
  | 'NavigationFrustratedTransaction'
  | 'NavigationSatisfiedTransaction'
  | 'NavigationToleratedTransaction'
  | 'PerformanceNavigationDuration'
  | 'RumEventPayloadSize'
  | 'SessionCount'
  | 'WebVitalsCumulativeLayoutShift'
  | 'WebVitalsFirstInputDelay'
  | 'WebVitalsLargestContentfulPaint';

export default RumMetricKey;
