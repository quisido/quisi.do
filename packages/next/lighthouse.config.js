export default {
  extends: 'lighthouse:default',
  settings: {
    blockedUrlPatterns: ['https://cloudflareinsights.com/cdn-cgi/rum'],
    budgetPath: 'lighthouse.budget.json',
    chromeFlags: "--headless",
    enableErrorReporting: true,
    output: ["html", "json"],
    outputPath: "lighthouse",
    preset: "experimental",
    saveAssets: true,
    verbose: true,
  },
};
