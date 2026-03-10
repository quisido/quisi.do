import {
  type MetricDimensions,
  MetricName as WorkerMetricName,
} from '@quisido/worker';
import handleD1All from './handle-d1-all.js';
import handleD1Error from './handle-d1-error.js';
import handleD1Run from './handle-d1-run.js';
import handleFetch from './handle-fetch.js';
import handleInvalidBinding from './handle-invalid-binding.js';
import handleKVGet from './handle-kv-get.js';
import handleKVGetError from './handle-kv-get-error.js';
import handleKVPut from './handle-kv-put.js';
import handleKVPutError from './handle-kv-put-error.js';
import handleR2Put from './handle-r2-put.js';
import handleR2PutError from './handle-r2-put-error.js';
import type MetricResult from './metric-result.js';

export default function handleWorkerMetric(
  name: WorkerMetricName,
  dimensions: MetricDimensions,
): MetricResult | null {
  switch (name) {
    case WorkerMetricName.D1PreparedStatementAll:
      return handleD1All(dimensions);

    case WorkerMetricName.D1PreparedStatementAllError:
    case WorkerMetricName.D1PreparedStatementRunError:
      return handleD1Error(dimensions);

    case WorkerMetricName.D1PreparedStatementRun:
      return handleD1Run(dimensions);

    case WorkerMetricName.Fetch:
      return handleFetch(dimensions);

    case WorkerMetricName.InvalidBinding:
      return handleInvalidBinding(dimensions);

    case WorkerMetricName.KVNamespaceGet:
      return handleKVGet(dimensions);

    case WorkerMetricName.KVNamespaceGetError:
      return handleKVGetError(dimensions);

    case WorkerMetricName.KVNamespacePut:
      return handleKVPut(dimensions);

    case WorkerMetricName.KVNamespacePutError:
      return handleKVPutError(dimensions);

    case WorkerMetricName.R2BucketPut:
      return handleR2Put(dimensions);

    case WorkerMetricName.R2BucketPutError:
      return handleR2PutError(dimensions);
  }

  return null;
}
