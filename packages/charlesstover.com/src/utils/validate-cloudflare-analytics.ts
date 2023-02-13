import type CloudflareAnalytics from '../types/cloudflare-analytics';
import findCloudflareAnalytics from './find-cloudflare-analytics';

export default function validateCloudflareAnalytics(
  value: unknown,
): CloudflareAnalytics {
  if (!findCloudflareAnalytics(value)) {
    throw new Error(
      `Expected Cloudflare analytics, but received ${typeof value} ${JSON.stringify(
        value,
      )}.`,
    );
  }

  return value;
}
