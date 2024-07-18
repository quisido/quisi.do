import { type Metric } from './metric.js';

export default interface TelemetryOptions<M extends Metric> {
  readonly invalidPrivateDatasetMetricName: M extends Metric<
    infer N,
    never,
    'type'
  >
    ? N
    : never;
  readonly invalidPublicDatasetMetricName: M extends Metric<
    infer N,
    never,
    'type'
  >
    ? N
    : never;
  readonly invalidTraceParentMetricName: M extends Metric<infer N> ? N : never;
  readonly invalidUsageDatasetMetricName: M extends Metric<
    infer N,
    never,
    'type'
  >
    ? N
    : never;
  readonly missingPrivateDatasetMetricName: M extends Metric<infer N>
    ? N
    : never;
  readonly missingPublicDatasetMetricName: M extends Metric<infer N>
    ? N
    : never;
  readonly missingTraceParentMetricName: M extends Metric<infer N> ? N : never;
  readonly missingUsageDatasetMetricName: M extends Metric<infer N> ? N : never;
}
