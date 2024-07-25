import type TraceParentMetricDimensions from './trace-parent-metric-dimensions.js';

export const DEFAULT_TRACE_PARENT_METRIC_DIMENSIONS: Omit<
  TraceParentMetricDimensions,
  'traceId'
> = {
  traceFlags: 0,
  traceParentId: '0000000000000000',
  traceVersion: 0,
};
