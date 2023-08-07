const ORIGIN: string =
  process.env.REACT_APP_CLOUDFLARE_ANALYTICS_ORIGIN ??
  'https://analytics.cloudflare.cscdn.net';

const CLOUDFLARE_ANALYTICS_URL = `${ORIGIN}/cf.json`;

export default CLOUDFLARE_ANALYTICS_URL;
