export default interface Env {
  readonly ACCOUNT_TAG: unknown;
  readonly API_TOKEN: unknown;
  readonly ERRORS: AnalyticsEngineDataset;
  readonly FETCH: AnalyticsEngineDataset;
  readonly RESULTS: R2Bucket;
  readonly SCHEDULED: AnalyticsEngineDataset;
  readonly ZONE_TAG: unknown;
}
