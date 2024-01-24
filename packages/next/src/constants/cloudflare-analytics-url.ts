const ORIGIN: string =
  process.env['CLOUDFLARE_ANALYTICS_ORIGIN'] ??
  'https://analytics.cloudflare.cscdn.net';

const CLOUDFLARE_ANALYTICS_URL = `${ORIGIN}/cf.json`;

export default CLOUDFLARE_ANALYTICS_URL;
