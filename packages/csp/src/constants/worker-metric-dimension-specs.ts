import { MetricName as WorkerMetricName } from '@quisido/worker';

export type DimensionType = 'boolean' | 'number' | 'string';

export interface WorkerMetricDimensionSpec {
  /** Dimension keys and their required types for the metric to be valid. */
  readonly required: Readonly<Record<string, DimensionType>>;
  /** Dimension keys to emit to the private dataset, or undefined to skip the private emit. */
  readonly privateKeys?: readonly string[];
  /** Dimension keys to emit to the public dataset, or undefined to skip the public emit. */
  readonly publicKeys?: readonly string[];
}

const WORKER_METRIC_DIMENSION_SPECS: Readonly<
  Partial<Record<WorkerMetricName, WorkerMetricDimensionSpec>>
> = {
  [WorkerMetricName.D1PreparedStatementAll]: {
    privateKeys: [
      'changedDb',
      'changes',
      'duration',
      'endTime',
      'env',
      'lastRowId',
      'query',
      'results',
      'rowsRead',
      'rowsWritten',
      'sizeAfter',
      'startTime',
    ],
    publicKeys: [
      'changedDb',
      'changes',
      'duration',
      'endTime',
      'env',
      'results',
      'rowsRead',
      'rowsWritten',
      'sizeAfter',
      'startTime',
    ],
    required: {
      changedDb: 'boolean',
      changes: 'number',
      duration: 'number',
      endTime: 'number',
      env: 'string',
      lastRowId: 'number',
      query: 'string',
      results: 'number',
      rowsRead: 'number',
      rowsWritten: 'number',
      sizeAfter: 'number',
      startTime: 'number',
    },
  },
  [WorkerMetricName.D1PreparedStatementAllError]: {
    privateKeys: ['endTime', 'env', 'query', 'startTime'],
    publicKeys: ['endTime', 'env', 'startTime'],
    required: {
      endTime: 'number',
      env: 'string',
      query: 'string',
      startTime: 'number',
    },
  },
  [WorkerMetricName.D1PreparedStatementRun]: {
    privateKeys: [
      'changedDb',
      'changes',
      'duration',
      'endTime',
      'env',
      'lastRowId',
      'query',
      'rowsRead',
      'rowsWritten',
      'sizeAfter',
      'startTime',
    ],
    publicKeys: [
      'changedDb',
      'changes',
      'duration',
      'endTime',
      'env',
      'rowsRead',
      'rowsWritten',
      'sizeAfter',
      'startTime',
    ],
    required: {
      changedDb: 'boolean',
      changes: 'number',
      duration: 'number',
      endTime: 'number',
      env: 'string',
      lastRowId: 'number',
      query: 'string',
      rowsRead: 'number',
      rowsWritten: 'number',
      sizeAfter: 'number',
      startTime: 'number',
    },
  },
  [WorkerMetricName.D1PreparedStatementRunError]: {
    privateKeys: ['endTime', 'env', 'query', 'startTime'],
    publicKeys: ['endTime', 'env', 'startTime'],
    required: {
      endTime: 'number',
      env: 'string',
      query: 'string',
      startTime: 'number',
    },
  },
  [WorkerMetricName.Fetch]: {
    required: {
      endTime: 'number',
      startTime: 'number',
      url: 'string',
    },
  },
  [WorkerMetricName.InvalidBinding]: {
    privateKeys: ['key', 'value'],
    publicKeys: ['key', 'type'],
    required: {
      key: 'string',
      type: 'string',
      value: 'string',
    },
  },
  [WorkerMetricName.KVNamespaceGet]: {
    privateKeys: ['endTime', 'env', 'key', 'startTime'],
    publicKeys: ['endTime', 'env', 'startTime'],
    required: {
      endTime: 'number',
      env: 'string',
      key: 'string',
      startTime: 'number',
    },
  },
  [WorkerMetricName.KVNamespaceGetError]: {
    publicKeys: ['endTime', 'env', 'startTime'],
    required: {
      endTime: 'number',
      env: 'string',
      startTime: 'number',
    },
  },
  [WorkerMetricName.KVNamespacePut]: {
    publicKeys: ['bytes', 'endTime', 'env', 'startTime', 'ttl'],
    required: {
      bytes: 'number',
      endTime: 'number',
      env: 'string',
      startTime: 'number',
      ttl: 'number',
    },
  },
  [WorkerMetricName.KVNamespacePutError]: {
    publicKeys: ['endTime', 'env', 'startTime'],
    required: {
      endTime: 'number',
      env: 'string',
      startTime: 'number',
    },
  },
  [WorkerMetricName.R2BucketPut]: {
    publicKeys: ['bytes', 'endTime', 'env', 'startTime'],
    required: {
      bytes: 'number',
      endTime: 'number',
      env: 'string',
      startTime: 'number',
    },
  },
  [WorkerMetricName.R2BucketPutError]: {
    publicKeys: ['endTime', 'env', 'startTime'],
    required: {
      endTime: 'number',
      env: 'string',
      startTime: 'number',
    },
  },
};

export default WORKER_METRIC_DIMENSION_SPECS;
