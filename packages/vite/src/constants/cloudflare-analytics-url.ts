const ORIGIN: string =
  import.meta.env.CLOUDFLARE_ANALYTICS_ORIGIN ??
  'https://analytics.cloudflare.cscdn.net';

export const CLOUDFLARE_ANALYTICS_URL: string = `${ORIGIN}/cf.json`;
