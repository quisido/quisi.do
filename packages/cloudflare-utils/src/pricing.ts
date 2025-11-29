// const BYTES_PER_GIGABYTE = 1024 * 1024 * 1024;
// const MINIMUM_SECONDS_PER_MONTH = 28 * 24 * 60 * 60;

export enum Pricing {
  /**
   * $1.00 per million
   * https://developers.cloudflare.com/analytics/analytics-engine/pricing/
   */
  AnalyticsReadQuery = 1 / 1_000_000,

  /**
   * $0.25 per million
   * https://developers.cloudflare.com/analytics/analytics-engine/pricing/
   */
  AnalyticsDataPointsWritten = 0.25 / 1_000_000,

  /**
   * $0.001 per million rows
   * https://developers.cloudflare.com/d1/platform/pricing/
   */
  D1RowsRead = 0.001 / 1_000_000,

  /**
   * $1.00 per million rows
   * https://developers.cloudflare.com/d1/platform/pricing/
   */
  D1RowsWritten = 1 / 1_000_000,

  /**
   * $0.75 per GB-month
   * https://developers.cloudflare.com/d1/platform/pricing/
   */
  // D1Storage = 0.75 / BYTES_PER_GIGABYTE / MINIMUM_SECONDS_PER_MONTH,
  D1Storage = 0.75 / (1024 * 1024 * 1024) / (28 * 24 * 60 * 60),

  /**
   * $5.00 per million
   * https://developers.cloudflare.com/kv/platform/pricing/
   */
  KVKeysDeleted = 5 / 1_000_000,

  /**
   * $0.50 per million
   * https://developers.cloudflare.com/kv/platform/pricing/
   */
  KVKeysRead = 0.5 / 1_000_000,

  /**
   * $5.00 per million
   * https://developers.cloudflare.com/kv/platform/pricing/
   */
  KVKeysWritten = 5 / 1_000_000,

  /**
   * $5.00 per million
   * https://developers.cloudflare.com/kv/platform/pricing/
   */
  KVListRequests = 5 / 1_000_000,

  /**
   * $0.50 per GB-month
   * https://developers.cloudflare.com/kv/platform/pricing/
   */
  // KVStoredData = 0.5 / BYTES_PER_GIGABYTE / MINIMUM_SECONDS_PER_MONTH,
  KVStoredData = 0.5 / (1024 * 1024 * 1024) / (28 * 24 * 60 * 60),

  /**
   * $9.00 per million requests (infrequent access)
   * https://developers.cloudflare.com/r2/pricing/
   */
  R2ClassAOperations = 9 / 1_000_000,

  /**
   * $0.90 per million requests (infrequent access)
   * https://developers.cloudflare.com/r2/pricing/
   */
  R2ClassBOperations = 0.9 / 1_000_000,

  /**
   * $0.015 per GB-month (standard)
   * https://developers.cloudflare.com/r2/pricing/
   */
  // R2Storage = 0.015 / BYTES_PER_GIGABYTE / MINIMUM_SECONDS_PER_MONTH,
  R2Storage = 0.015 / (1024 * 1024 * 1024) / (28 * 24 * 60 * 60),
}
