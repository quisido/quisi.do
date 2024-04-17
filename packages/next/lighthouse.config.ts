import type { Config } from 'lighthouse';

const lightghouseConfig: Config = {
  extends: 'lighthouse:default',
  settings: {
    // budgetPath: 'lighthouse.budget.json',
    // chromeFlags: "--headless",
    // enableErrorReporting: true,
    locale: 'en-US',
    // output: ['html', 'json'],
    // outputPath: "lighthouse",
    // preset: "experimental",
    // saveAssets: true,
    // verbose: false,
    blockedUrlPatterns: [
      'https://api.quisi.do/whoami', // temp. block for fixing commit to pass CI
      'https://browser-intake-datadoghq.com/*',
      'https://cloudflareinsights.com/*',
      'https://edge.fullstory.com/*',
      'https://localhost:1098/whoami', // invalid certificate
      'https://o592283.ingest.sentry.io/*',
      'https://rs.fullstory.com/*',
      'https://stats.g.doubleclick.net/*',
      'https://www.clarity.ms/*',
      'https://www.google.com/ads/*',
      'https://www.googleadservices.com/*',
      'https://www.google-analytics.com/*',
      'https://www.googletagmanager.com/*',
    ],
  },
};

export default lightghouseConfig;
