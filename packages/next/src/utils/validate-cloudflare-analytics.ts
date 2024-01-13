import type CloudflareAnalytics from '../types/cloudflare-analytics.js';
import isCloudflareAnalytics from './is-cloudflare-analytics.js';

export default function validateCloudflareAnalytics(
  value: unknown,
): CloudflareAnalytics {
  if (!isCloudflareAnalytics(value)) {
    throw new Error(
      `Expected Cloudflare analytics, but received ${typeof value} ${JSON.stringify(
        value,
      )}.`,
    );
  }

  return value;
}
