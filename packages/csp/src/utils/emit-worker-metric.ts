import {
  type MetricDimensions,
  MetricName as WorkerMetricName,
} from '@quisido/worker';

type FieldType = 'boolean' | 'number' | 'string';
type EmitFn = (dimensions: MetricDimensions) => void;

interface FieldSpec {
  readonly private?: true;
  readonly public?: true;
  readonly type: FieldType;
}

type MetricSpec = Readonly<Record<string, FieldSpec>>;

interface EmitContext {
  readonly emitInvalid: () => void;
  readonly emitPrivately: EmitFn;
  readonly emitPublicly: EmitFn;
}

const D1_TIMING_FIELDS = {
  endTime: {
    private: true as const,
    public: true as const,
    type: 'number' as const,
  },
  env: {
    private: true as const,
    public: true as const,
    type: 'string' as const,
  },
  startTime: {
    private: true as const,
    public: true as const,
    type: 'number' as const,
  },
};

const D1_RESULT_FIELDS: MetricSpec = {
  changedDb: { private: true, public: true, type: 'boolean' },
  changes: { private: true, public: true, type: 'number' },
  duration: { private: true, public: true, type: 'number' },
  ...D1_TIMING_FIELDS,
  lastRowId: { private: true, type: 'number' },
  query: { private: true, type: 'string' },
  rowsRead: { private: true, public: true, type: 'number' },
  rowsWritten: { private: true, public: true, type: 'number' },
  sizeAfter: { private: true, public: true, type: 'number' },
};

const D1_ALL_SPEC: MetricSpec = {
  ...D1_RESULT_FIELDS,
  results: { private: true, public: true, type: 'number' },
};

const D1_ERROR_SPEC: MetricSpec = {
  ...D1_TIMING_FIELDS,
  query: { private: true, type: 'string' },
};

const PUBLIC_TIMING_SPEC: MetricSpec = {
  endTime: { public: true, type: 'number' },
  env: { public: true, type: 'string' },
  startTime: { public: true, type: 'number' },
};

const PUBLIC_TIMING_WITH_BYTES_SPEC: MetricSpec = {
  bytes: { public: true, type: 'number' },
  ...PUBLIC_TIMING_SPEC,
};

const KV_PUT_SPEC: MetricSpec = {
  ...PUBLIC_TIMING_WITH_BYTES_SPEC,
  ttl: { public: true, type: 'number' },
};

const KV_GET_SPEC: MetricSpec = {
  ...D1_TIMING_FIELDS,
  key: { private: true, type: 'string' },
};

const INVALID_BINDING_SPEC: MetricSpec = {
  key: { private: true, public: true, type: 'string' },
  type: { public: true, type: 'string' },
  value: { private: true, type: 'string' },
};

const METRIC_SPECS: Partial<Record<WorkerMetricName, MetricSpec>> = {
  [WorkerMetricName.D1PreparedStatementAll]: D1_ALL_SPEC,
  [WorkerMetricName.D1PreparedStatementAllError]: D1_ERROR_SPEC,
  [WorkerMetricName.D1PreparedStatementRun]: D1_RESULT_FIELDS,
  [WorkerMetricName.D1PreparedStatementRunError]: D1_ERROR_SPEC,
  [WorkerMetricName.InvalidBinding]: INVALID_BINDING_SPEC,
  [WorkerMetricName.KVNamespaceGet]: KV_GET_SPEC,
  [WorkerMetricName.KVNamespaceGetError]: PUBLIC_TIMING_SPEC,
  [WorkerMetricName.KVNamespacePut]: KV_PUT_SPEC,
  [WorkerMetricName.KVNamespacePutError]: PUBLIC_TIMING_SPEC,
  [WorkerMetricName.R2BucketPut]: PUBLIC_TIMING_WITH_BYTES_SPEC,
  [WorkerMetricName.R2BucketPutError]: PUBLIC_TIMING_SPEC,
};

const validateDimensions = (
  dimensions: MetricDimensions,
  spec: MetricSpec,
): boolean => {
  for (const [key, { type }] of Object.entries(spec)) {
    const value = dimensions[key];
    if (value === undefined || typeof value !== type) {
      return false;
    }
  }
  return true;
};

const extractDimensions = (
  dimensions: MetricDimensions,
  spec: MetricSpec,
  visibility: 'private' | 'public',
): Record<string, boolean | number | string> => {
  const result: Record<string, boolean | number | string> = {};
  for (const [key, fieldSpec] of Object.entries(spec)) {
    const value = dimensions[key];
    if (fieldSpec[visibility] === true && value !== undefined) {
      result[key] = value;
    }
  }
  return result;
};

const emitFromSpec = (
  dimensions: MetricDimensions,
  spec: MetricSpec,
  { emitInvalid, emitPrivately, emitPublicly }: EmitContext,
): void => {
  if (!validateDimensions(dimensions, spec)) {
    emitInvalid();
    return;
  }

  const privateDims = extractDimensions(dimensions, spec, 'private');
  const publicDims = extractDimensions(dimensions, spec, 'public');

  if (Object.keys(privateDims).length > 0) {
    emitPrivately(privateDims);
  }

  if (Object.keys(publicDims).length > 0) {
    emitPublicly(publicDims);
  }
};

const emitFetchMetric = (
  dimensions: MetricDimensions,
  { emitInvalid, emitPrivately, emitPublicly }: EmitContext,
): void => {
  const { endTime, startTime, url } = dimensions;
  if (
    typeof endTime !== 'number' ||
    typeof startTime !== 'number' ||
    typeof url !== 'string'
  ) {
    emitInvalid();
    return;
  }

  try {
    const { origin } = new URL(url);
    emitPrivately({ endTime, startTime, url });
    emitPublicly({ endTime, origin, startTime });
  } catch (_err: unknown) {
    emitInvalid();
  }
};

export default function emitWorkerMetric(
  name: WorkerMetricName,
  dimensions: MetricDimensions,
  context: EmitContext,
): void {
  if (name === WorkerMetricName.Fetch) {
    emitFetchMetric(dimensions, context);
    return;
  }

  const spec: MetricSpec | undefined = METRIC_SPECS[name];
  if (spec !== undefined) {
    emitFromSpec(dimensions, spec, context);
  }
}
