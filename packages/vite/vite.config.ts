import basicSsl from '@vitejs/plugin-basic-ssl';
import ddPlugin from 'dd-trace/esbuild';
import buildTSConfig from './tsconfig.build.json' with { type: 'json' };
import {
  defineConfig,
  type ConfigEnv,
  type ESBuildOptions,
  type UserConfig,
} from 'vite';
import react from '@vitejs/plugin-react';
import reduceEnvironmentVariableNamesToRecord from './src/utils/reduce-environment-variable-names-to-record.js';
import type { Compulsory } from './src/types/compulsory.js';

const ESBUILD_OPTIONS: ESBuildOptions = {
  color: true,
  jsx: 'preserve',
  sourcesContent: true,
};

const USER_CONFIG: UserConfig = {
  base: '/',
  envDir: '../',
  esbuild: ESBUILD_OPTIONS,
  publicDir: '../public/',
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
    'MIXPANEL_TOKEN',
    'NODE_ENV',
    'NYC_REPORT_DIR',
    'PATREON_OAUTH_CLIENT_ID',
    'PATREON_OAUTH_REDIRECT_URI',
    'POSTHOG_HOST',
    'POSTHOG_KEY',
    'SENTRY_ENVIRONMENT',
    'WHOAMI',
  ].reduce(reduceEnvironmentVariableNamesToRecord, {}),
};

const DEVELOPMENT_USER_CONFIG: UserConfig = {
  ...USER_CONFIG,
  plugins: [basicSsl(), ddPlugin, react()],

  css: {
    preprocessorMaxWorkers: true,
  },

  esbuild: {
    ...ESBUILD_OPTIONS,
    jsxDev: true,
    lineLimit: 80,
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
    sourceRoot: './src/',
    sourcemap: 'both',
  },

  server: {
    port: 3000,

    headers: {
      'document-policy': 'js-profiling',
    },
  },
};

const PRODUCTION_USER_CONFIG: UserConfig = {
  ...USER_CONFIG,
  plugins: [ddPlugin, react()],

  build: {
    emptyOutDir: true,
    outDir: '../dist/',
    sourcemap: true,
  },

  esbuild: {
    ...ESBUILD_OPTIONS,
    jsxDev: false,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    sourceRoot: buildTSConfig.compilerOptions.sourceRoot,
    tsconfigRaw: buildTSConfig as Compulsory<ESBuildOptions['tsconfigRaw']>,
  },

  html: {
    cspNonce: 'nonce-quisido',
  },
};

export default defineConfig((env: ConfigEnv): UserConfig => {
  if (env.mode !== 'production') {
    return DEVELOPMENT_USER_CONFIG;
  }

  return PRODUCTION_USER_CONFIG;
});
