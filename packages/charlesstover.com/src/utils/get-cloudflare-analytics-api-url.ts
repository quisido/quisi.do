export default function getCloudflareAnalyticsApiUrl(): string {
  const hostname: string | undefined =
    process.env.REACT_APP_CLOUDFLARE_ANALYTICS_API;

  if (typeof hostname === 'undefined') {
    return 'https://cf-analytics.cscdn.net/cf.json';
  }

  return `${hostname}/cf.json`;
}
