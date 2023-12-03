export default {
  extends: 'lighthouse:default',
  settings: {
    // budgetPath: 'lighthouse.budget.json',
    // chromeFlags: "--headless",
    // enableErrorReporting: true,
    // output: ['html', 'json'],
    // outputPath: "lighthouse",
    // preset: "experimental",
    // saveAssets: true,
    // verbose: false,
    blockedUrlPatterns: [
      'https://cloudflareinsights.com/*',
      'https://www.clarity.ms/*',
    ],
  },
};
