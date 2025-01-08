export default interface DashboardApiResponse {
  readonly cls: readonly [number, number];
  readonly fcp: readonly [number, number];
  readonly inp: readonly [number, number];
  readonly lcp: readonly [number, number];
  readonly loadingTime: readonly [number, number];
}
