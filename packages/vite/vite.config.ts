import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import ddPlugin from 'dd-trace/esbuild';
import {
  type ConfigEnv,
  defineConfig,
  type UserConfig,
  type UserConfigFnObject,
} from 'vite';
import reduceEnvironmentVariableNamesToRecord from './src/utils/reduce-environment-variable-names-to-record.js';

/**
 *   Disabled because "Both esbuild and oxc options were set. oxc options will
 * be used and esbuild options will be ignored."
const ESBUILD_OPTIONS: ESBuildOptions = {
  color: true,
  jsx: 'preserve',
  sourcesContent: true,
};
 */

const USER_CONFIG: UserConfig = {
  base: '/',
  define: [
    'CLARITY_TAG',
    'CLOUD_ACCOUNT_ID',
    'CLOUD_PLATFORM',
    'CLOUD_PROVIDER',
    'CLOUDFLARE_ANALYTICS_ORIGIN',
    'CLOUDFLARE_INSIGHTS_TOKEN',
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
    'MIXPANEL_TOKEN',
    'NEW_RELIC_LICENSE_KEY',
    'NODE_ENV',
    'PATREON_OAUTH_CLIENT_ID',
    'PATREON_OAUTH_REDIRECT_URI',
    'POSTHOG_HOST',
    'POSTHOG_KEY',
    'SENTRY_ENVIRONMENT',
    'WHOAMI',
  ].reduce(reduceEnvironmentVariableNamesToRecord, {}),
  envDir: '../',
  /**
   *   Disabled because "Both esbuild and oxc options were set. oxc options will
   * be used and esbuild options will be ignored."
  esbuild: ESBUILD_OPTIONS,
   */
  publicDir: '../public',
  root: 'src',
};

const DEVELOPMENT_USER_CONFIG: UserConfig = {
  ...USER_CONFIG,
  css: {
    preprocessorMaxWorkers: true,
  },
  /**
   *   Disabled because "Both esbuild and oxc options were set. oxc options will
   * be used and esbuild options will be ignored." 
  esbuild: {
    ...ESBUILD_OPTIONS,
    jsxDev: true,
    lineLimit: 80,
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
    sourcemap: 'both',
    sourceRoot: tsconfig.compilerOptions.sourceRoot,
  },
   */
  plugins: [basicSsl(), ddPlugin, react()],
  server: {
    headers: {
      'document-policy': 'js-profiling',
    },
    port: 3000,
  },
};

const PRODUCTION_USER_CONFIG: UserConfig = {
  ...USER_CONFIG,
  build: {
    emptyOutDir: true,
    outDir: '../_site', // relative to `root` ('src/')
    sourcemap: true,
  },
  /**
   *   Disabled because "Both esbuild and oxc options were set. oxc options will
   * be used and esbuild options will be ignored."
  esbuild: {
    ...ESBUILD_OPTIONS,
    jsxDev: false,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    sourceRoot: buildTSConfig.compilerOptions.sourceRoot,
    tsconfigRaw: buildTSConfig as Compulsory<ESBuildOptions['tsconfigRaw']>,
  },
   */
  html: {
    cspNonce: 'nonce-quisido',
  },
  plugins: [ddPlugin, react()],
};

const CONFIG: UserConfigFnObject = defineConfig(
  ({ mode }: ConfigEnv): UserConfig => {
    if (mode !== 'production') {
      return DEVELOPMENT_USER_CONFIG;
    }

    return PRODUCTION_USER_CONFIG;
  },
);

export default CONFIG;
