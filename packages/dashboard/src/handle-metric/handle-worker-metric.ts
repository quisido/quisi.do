import {
  type MetricDimensions,
  MetricName as WorkerMetricName,
} from '@quisido/worker';
import type MetricEmitters from './metric-emitters.js';
import pickDimensions from './pick-dimensions.js';
import validateDimensions, {
  type ExpectedType,
} from './validate-dimensions.js';

type WorkerMetricHandlerFn = (
  dimensions: MetricDimensions,
  emitters: MetricEmitters,
) => void;

interface HandlerOptions {
  readonly excludeFromPrivate?: readonly string[];
  readonly excludeFromPublic?: readonly string[];
  readonly publicOnly?: boolean;
}

const filterKeys = (
  keys: readonly string[],
  exclude?: readonly string[],
): readonly string[] => {
  if (exclude === undefined) {
    return keys;
  }
  return keys.filter(key => !exclude.includes(key));
};

const resolvePrivateKeys = (
  allKeys: readonly string[],
  options: HandlerOptions,
): readonly string[] | undefined => {
  if (options.publicOnly === true) {
    return undefined;
  }
  return filterKeys(allKeys, options.excludeFromPrivate);
};

const createHandler = (
  schema: Readonly<Record<string, ExpectedType>>,
  options: HandlerOptions = {},
): WorkerMetricHandlerFn => {
  const allKeys = Object.keys(schema);
  const privateKeys = resolvePrivateKeys(allKeys, options);
  const publicKeys = filterKeys(allKeys, options.excludeFromPublic);

  return (dimensions: MetricDimensions, emitters: MetricEmitters): void => {
    if (!validateDimensions(dimensions, schema)) {
      emitters.emitInvalidWorkerMetric();
      return;
    }

    if (privateKeys !== undefined) {
      emitters.emitPrivately(pickDimensions(dimensions, privateKeys));
    }

    emitters.emitPublicly(pickDimensions(dimensions, publicKeys));
  };
};

const handleFetch = (
  dimensions: MetricDimensions,
  { emitInvalidWorkerMetric, emitPrivately, emitPublicly }: MetricEmitters,
): void => {
  const { endTime, startTime, url } = dimensions;
  if (
    typeof endTime !== 'number' ||
    typeof startTime !== 'number' ||
    typeof url !== 'string'
  ) {
    emitInvalidWorkerMetric();
    return;
  }

  try {
    const { origin } = new URL(url);
    emitPrivately({ endTime, startTime, url });
    emitPublicly({ endTime, origin, startTime });
  } catch (_err: unknown) {
    emitInvalidWorkerMetric();
  }
};

const handleD1PreparedStatementError = createHandler(
  {
    endTime: 'number',
    env: 'string',
    query: 'string',
    startTime: 'number',
  },
  { excludeFromPublic: ['query'] },
);

const HANDLERS = new Map<WorkerMetricName, WorkerMetricHandlerFn>([
  [
    WorkerMetricName.D1PreparedStatementAll,
    createHandler(
      {
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
      { excludeFromPublic: ['lastRowId', 'query'] },
    ),
  ],

  [
    WorkerMetricName.D1PreparedStatementAllError,
    handleD1PreparedStatementError,
  ],

  [
    WorkerMetricName.D1PreparedStatementRun,
    createHandler(
      {
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
      { excludeFromPublic: ['lastRowId', 'query'] },
    ),
  ],

  [
    WorkerMetricName.D1PreparedStatementRunError,
    handleD1PreparedStatementError,
  ],

  [WorkerMetricName.Fetch, handleFetch],

  [
    WorkerMetricName.InvalidBinding,
    createHandler(
      {
        key: 'string',
        type: 'string',
        value: 'string',
      },
      {
        excludeFromPrivate: ['type'],
        excludeFromPublic: ['value'],
      },
    ),
  ],

  [
    WorkerMetricName.KVNamespaceGet,
    createHandler(
      {
        endTime: 'number',
        env: 'string',
        key: 'string',
        startTime: 'number',
      },
      { excludeFromPublic: ['key'] },
    ),
  ],

  [
    WorkerMetricName.KVNamespaceGetError,
    createHandler(
      {
        endTime: 'number',
        env: 'string',
        startTime: 'number',
      },
      { publicOnly: true },
    ),
  ],

  [
    WorkerMetricName.KVNamespacePut,
    createHandler(
      {
        bytes: 'number',
        endTime: 'number',
        env: 'string',
        startTime: 'number',
        ttl: 'number',
      },
      { publicOnly: true },
    ),
  ],

  [
    WorkerMetricName.KVNamespacePutError,
    createHandler(
      {
        endTime: 'number',
        env: 'string',
        startTime: 'number',
      },
      { publicOnly: true },
    ),
  ],

  [
    WorkerMetricName.R2BucketPut,
    createHandler(
      {
        bytes: 'number',
        endTime: 'number',
        env: 'string',
        startTime: 'number',
      },
      { publicOnly: true },
    ),
  ],

  [
    WorkerMetricName.R2BucketPutError,
    createHandler(
      {
        endTime: 'number',
        env: 'string',
        startTime: 'number',
      },
      { publicOnly: true },
    ),
  ],
]);

const handleWorkerMetric = (
  name: WorkerMetricName,
  dimensions: MetricDimensions,
  emitters: MetricEmitters,
): boolean => {
  const handler = HANDLERS.get(name);
  if (handler === undefined) {
    return false;
  }
  handler(dimensions, emitters);
  return true;
};

export default handleWorkerMetric;
