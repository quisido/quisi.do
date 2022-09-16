import type CloudflareAnalyticsDatasets from './cloudflare-analytics-datasets';

export default interface CloudflareAnalytics {
  readonly budget: number;
  readonly datasets: CloudflareAnalyticsDatasets;
}
