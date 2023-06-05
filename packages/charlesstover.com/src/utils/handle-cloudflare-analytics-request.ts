import CLOUDFLARE_ANALYTICS_URL from '../constants/cloudflare-analytics-url';
import type CloudflareAnalytics from '../types/cloudflare-analytics';
import validateCloudflareAnalytics from './validate-cloudflare-analytics';

export default async function handleCloudflareAnalyticsRequest(): Promise<CloudflareAnalytics> {
  const response: Response = await window.fetch(CLOUDFLARE_ANALYTICS_URL);
  const json: unknown = await response.json();
  return validateCloudflareAnalytics(json);
}
