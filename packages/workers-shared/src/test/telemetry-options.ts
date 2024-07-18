import type { StateOptions } from '../index.js';
import type { TestMetric } from './metric.js';

export const TEST_TELEMETRY_OPTIONS: StateOptions<TestMetric> = {
  invalidPrivateDatasetMetricName: 'test-invalid-private-dataset-metric-name',
  invalidPublicDatasetMetricName: 'test-invalid-public-dataset-metric-name',
  invalidTraceParentMetricName: 'test-invalid-trace-parent-metric-name',
  invalidUsageDatasetMetricName: 'test-invalid-usage-dataset-metric-name',
  missingPrivateDatasetMetricName: 'test-missing-private-dataset-metric-name',
  missingPublicDatasetMetricName: 'test-missing-public-dataset-metric-name',
  missingTraceParentMetricName: 'test-missing-trace-parent-metric-name',
  missingUsageDatasetMetricName: 'test-missing-usage-dataset-metric-name',
};
