import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reduceEnvironmentVariableNamesToRecord from './src/utils/reduce-environment-variable-names-to-record.js';

export default defineConfig({
  base: '/',
  envDir: '../',
  plugins: [react()],
  root: './src/',

  define: [
    'CLARITY_TAG',
    'CLOUD_ACCOUNT_ID',
    'CLOUD_PLATFORM',
    'CLOUD_PROVIDER',
    'CLOUDFLARE_ANALYTICS_ORIGIN',
    'CLOUDFLARE_INSIGHTS_TOKEN',
    'CPUS',
    'CSP_ORIGIN',
    'CYPRESS_SCREENSHOTS_SUBFOLDER',
    'DASHBOARD_ENDPOINT',
    'DD_APPLICATION_ID',
    'DD_CLIENT_TOKEN',
    'DEPLOYMENT_ENVIRONMENT',
    'GITHUB_REPOSITORY',
    'GITHUB_SHA',
    'GOOGLE_ANALYTICS_TRACKING_ID',
    'HONEYCOMB_API_KEY',
    'METICULOUS_RECORDING_TOKEN',
    'NODE_ENV',
    'NYC_REPORT_DIR',
    'PATREON_OAUTH_CLIENT_ID',
    'PATREON_OAUTH_REDIRECT_URI',
    'POSTHOG_HOST',
    'POSTHOG_KEY',
    'SENTRY_ENVIRONMENT',
    'WHOAMI',
  ].reduce(reduceEnvironmentVariableNamesToRecord, {}),
});
