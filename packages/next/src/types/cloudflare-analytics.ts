import type CloudflareAnalyticsDatasets from './cloudflare-analytics-datasets.js';

export default interface CloudflareAnalytics {
  readonly budget: number;
  readonly datasets: CloudflareAnalyticsDatasets;
}
