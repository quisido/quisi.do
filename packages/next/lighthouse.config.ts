import { type Config } from 'lighthouse';

const lightghouseConfig: Config = {
  extends: 'lighthouse:default',
  settings: {
    /*
     * BudgetPath: 'lighthouse.budget.json',
     * chromeFlags: "--headless",
     * enableErrorReporting: true,
     */
    locale: 'en-US',
    /*
     * Output: ['html', 'json'],
     * outputPath: "lighthouse",
     * preset: "experimental",
     * saveAssets: true,
     * verbose: false,
     */

    blockedUrlPatterns: [
      'https://ajax.cloudflare.com/*',
      'https://analytics.google.com/*',
      'https://api.honeycomb.io/*',
      'https://api-js.mixpanel.com/*',
      'https://browser-intake-datadoghq.com/*',
      'https://c.bing.com/*',
      'https://c.clarity.ms/*',
      'https://cdn.logr-ingest.com/*',
      'https://cdn.lrkt-in.com/*',
      'https://challenges.cloudflare.com/*',
      'https://clarity.ms/*',
      'https://cloudflareinsights.com/*',
      'https://dataplane.rum.us-west-2.amazonaws.com/*',
      'https://edge.fullstory.com/*',
      'https://o592283.ingest.sentry.io/*',
      'https://quisi.do/cdn-cgi/speculation',
      'https://r.logr-ingest.com/*',
      'https://r.lrkt-in.com/*',
      'https://region1.analytics.google.com/*',
      'https://rs.fullstory.com/*',
      'https://rum.browser-intake-datadoghq.com/*',
      'https://session-replay.browser-intake-datadoghq.com/*',
      'https://static.cloudflareinsights.com/*',
      'https://stats.g.doubleclick.net/*',
      'https://t.clarity.ms/*',
      'https://td.doubleclick.net/*',
      'https://www.clarity.ms/*',
      'https://www.google.bg/ads/*',
      'https://www.google.ca/ads/*',
      'https://www.google.ch/ads/*',
      'https://www.google.cl/ads/*',
      'https://www.google.co.il/ads/*',
      'https://www.google.co.in/ads/*',
      'https://www.google.co.jp/ads/*',
      'https://www.google.co.kr/ads/*',
      'https://www.google.co.ma/ads/*',
      'https://www.google.co.uk/ads/*',
      'https://www.google.co.uz/ads/*',
      'https://www.google.com/ads/*',
      'https://www.google.com.ar/ads/*',
      'https://www.google.com.au/ads/*',
      'https://www.google.com.bd/ads/*',
      'https://www.google.com.br/ads/*',
      'https://www.google.com.hk/ads/*',
      'https://www.google.com.kh/ads/*',
      'https://www.google.com.mx/ads/*',
      'https://www.google.com.my/ads/*',
      'https://www.google.com.pk/ads/*',
      'https://www.google.com.sg/ads/*',
      'https://www.google.com.tr/ads/*',
      'https://www.google.com.ua/ads/*',
      'https://www.google.com.vn/ads/*',
      'https://www.google.de/ads/*',
      'https://www.google.fr/ads/*',
      'https://www.google.ie/ads/*',
      'https://www.google.it/ads/*',
      'https://www.google.nl/ads/*',
      'https://www.google.ro/ads/*',
      'https://www.google.ru/ads/*',
      'https://www.googleadservices.com/*',
      'https://www.google-analytics.com/*',
      'https://www.googletagmanager.com/*',

      // CWR: Failed to retrieve Cognito identity
      // 'https://cognito-identity.us-west-2.amazonaws.com/*',

      // CWR: Failed to retrieve credentials from STS
      // 'https://sts.us-west-2.amazonaws.com/*',

      // Services have an invalid local certificates.
      'https://localhost:5882/*',
      'https://localhost:6586/*',
      'https://localhost:9778/*',
    ],
  },
};

export default lightghouseConfig;
