import type { WorkerOptions } from '@quisido/worker';
import handleFetchError from '../features/handle-fetch-error.js';
import handleFetchRequest from '../features/handle-fetch-request.js';
import { MetricName } from './metric-name.js';

export const WORKER_OPTIONS: WorkerOptions = {
  invalidPrivateDatasetMetricName: MetricName.InvalidPrivateDataset,
  invalidPublicDatasetMetricName: MetricName.InvalidPublicDataset,
  invalidTraceParentMetricName: MetricName.InvalidTraceParent,
  // InvalidUsageDatasetMetricName: MetricName.InvalidUsageDataset,
  missingPrivateDatasetMetricName: MetricName.MissingPrivateDataset,
  missingPublicDatasetMetricName: MetricName.MissingPublicDataset,
  missingTraceParentMetricName: MetricName.MissingTraceParent,
  // MissingUsageDatasetMetricName: MetricName.MissingUsageDataset,
  onFetchError: handleFetchError,
  onFetchRequest: handleFetchRequest,
};
