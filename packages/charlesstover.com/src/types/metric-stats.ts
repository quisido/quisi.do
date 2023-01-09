export default interface MetricStats {
  readonly average: Record<string, number>;
  readonly p90: Record<string, number>;
}
