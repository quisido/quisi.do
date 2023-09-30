const PRECONNECT_HREFS: readonly string[] = [
  // Cloudflare
  'https://challenges.cloudflare.com',

  // Cloudflare Insights
  'https://cloudflareinsights.com',
  'https://static.cloudflareinsights.com',

  // CloudWatch RUM
  'https://dataplane.rum.us-west-2.amazonaws.com',

  // Datadog
  'https://rum.browser-intake-datadoghq.com',
  'https://session-replay.browser-intake-datadoghq.com',

  // Fullstory
  'https://edge.fullstory.com',
  'https://rs.fullstory.com',

  // Google Analytics
  'https://www.google-analytics.com',
  'https://www.googletagmanager.com',

  // Google Fonts
  'https://fonts.gstatic.com',

  // Honeycomb
  'https://api.honeycomb.io',

  // Report URI
  'https://cscdn.report-uri.com',

  // Sentry
  'https://o592283.ingest.sentry.io',
];

export default PRECONNECT_HREFS;
