export default {
  extends: 'lighthouse:default',
  settings: {
    blockedUrlPatterns: ['https://cloudflareinsights.com/cdn-cgi/rum'],
  },
};
