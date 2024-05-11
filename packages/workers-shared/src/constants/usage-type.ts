export enum UsageType {
  /**
   * $0.00000025
   * https://developers.cloudflare.com/analytics/analytics-engine/pricing/
   */
  AnalyticsEngineDatasetWriteDataPoint = 0,

  /**
   * $0.000000001
   * https://developers.cloudflare.com/d1/platform/pricing/
   */
  D1Read = 1,

  /**
   * $0.000001
   * https://developers.cloudflare.com/d1/platform/pricing/
   */
  D1Write = 2,

  /**
   * $0.0000005
   * https://developers.cloudflare.com/kv/platform/pricing/
   */
  KVRead = 3,

  /**
   * $0.50 per GB-month
   * $0.00000000000000190237903913118 per byte per second
   * https://developers.cloudflare.com/kv/platform/pricing/
   */
  KVStore = 5,

  /**
   * $0.000005
   * https://developers.cloudflare.com/kv/platform/pricing/
   */
  KVWrite = 4,
}
