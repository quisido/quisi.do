export default interface Env {
  readonly ACCOUNT_TAG: unknown;
  readonly API_TOKEN: unknown;
  readonly ERRORS: AnalyticsEngineDataset | undefined;
  readonly FETCH: AnalyticsEngineDataset | undefined;
  readonly RESULTS: R2Bucket | undefined;
  readonly SCHEDULED: AnalyticsEngineDataset | undefined;
  readonly ZONE_TAG: unknown;
}