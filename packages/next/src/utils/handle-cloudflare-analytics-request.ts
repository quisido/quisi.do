import CLOUDFLARE_ANALYTICS_URL from '../constants/cloudflare-analytics-url.js';
import type CloudflareAnalytics from '../types/cloudflare-analytics.js';
import validateCloudflareAnalytics from './validate-cloudflare-analytics.js';

export default async function handleCloudflareAnalyticsRequest(): Promise<CloudflareAnalytics> {
  const response: Response = await window.fetch(CLOUDFLARE_ANALYTICS_URL);
  const json: unknown = await response.json();
  // {"message":"internal error"}.
  return validateCloudflareAnalytics(json);
}
