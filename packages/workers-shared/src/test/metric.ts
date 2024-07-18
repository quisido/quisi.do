import type { Metric } from '../metric.js';

export type TestMetric =
  | Metric<'test', 'number', 'string'>
  | Metric<'test-invalid-private-dataset-metric-name', never, 'type'>
  | Metric<'test-invalid-public-dataset-metric-name', never, 'type'>
  | Metric<'test-invalid-trace-parent-metric-name'>
  | Metric<'test-invalid-usage-dataset-metric-name', never, 'type'>
  | Metric<'test-missing-private-dataset-metric-name'>
  | Metric<'test-missing-public-dataset-metric-name'>
  | Metric<'test-missing-trace-parent-metric-name'>
  | Metric<'test-missing-usage-dataset-metric-name'>;
