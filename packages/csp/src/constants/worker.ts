import Worker from '@quisido/worker';
import { StatusCode } from 'cloudflare-utils';
import handleFetchRequest from '../features/handle-fetch-request.js';
import Response from '../utils/response.js';
import { MetricName } from './metric-name.js';

export const {
  affect,
  emitPrivateMetric,
  emitPublicMetric,
  createExportedHandler,
  getD1Database,
  getRequestHeaders,
  getRequestMethod,
  getRequestPathname,
  getRequestSearchParam,
  getRequestText,
  logPrivateError,
  logPublicError,
} = new Worker({
  invalidPrivateDatasetMetricName: MetricName.InvalidPrivateDataset,
  invalidPublicDatasetMetricName: MetricName.InvalidPublicDataset,
  invalidTraceParentMetricName: MetricName.InvalidTraceParent,
  // InvalidUsageDatasetMetricName: MetricName.InvalidUsageDataset,
  missingPrivateDatasetMetricName: MetricName.MissingPrivateDataset,
  missingPublicDatasetMetricName: MetricName.MissingPublicDataset,
  missingTraceParentMetricName: MetricName.MissingTraceParent,
  // MissingUsageDatasetMetricName: MetricName.MissingUsageDataset,
  onFetchRequest: handleFetchRequest,

  onFetchError: (): Response => {
    return new Response(StatusCode.InternalServerError);
  },
});
