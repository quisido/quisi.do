export default interface NonSumMetricStats {
  readonly p95: Record<string, number>;
  readonly tm95: Record<string, number>;
}
