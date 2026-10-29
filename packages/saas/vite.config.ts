import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import ddPlugin from 'dd-trace/esbuild';
import {
  type ConfigEnv,
  defineConfig,
  type OxcOptions,
  type UserConfig,
  type UserConfigFnObject,
} from 'vite';
import reduceEnvironmentVariableNamesToRecord from './src/utils/reduce-environment-variable-names-to-record.js';

// `IsolatedDeclarationsOptions` is typed by `rolldown` but not re-exported by `vite`.
type IsolatedDeclarationsOptions = Exclude<
  TypeScriptOptions['declaration'],
  undefined
>;

// `JsxOptions` is typed by `rolldown` but not re-exported by `vite`.
type JsxOptions = Exclude<OxcOptions['jsx'], string | undefined>;

// `TypeScriptOptions` is typed by `rolldown` but not re-exported by `vite`.
type TypeScriptOptions = Exclude<OxcOptions['typescript'], undefined>;

/**
 * @see {@link https://oxc.rs/docs/guide/usage/transformer/global-variable-replacement#define}
 */
const DEFINE_PLUGIN: Record<string, string> = {};

const ISOLATED_DECLARATIONS_OPTIONS: IsolatedDeclarationsOptions = {
  sourcemap: true,
};

/** @see {@link https://oxc.rs/docs/guide/usage/transformer/jsx} */
const JSX_OPTIONS: JsxOptions = {
  refresh: true,
  runtime: 'automatic',
};

/** @see {@link https://oxc.rs/docs/guide/usage/transformer/typescript} */
const TYPESCRIPT_OPTIONS: TypeScriptOptions = {
  allowNamespaces: false,
  declaration: ISOLATED_DECLARATIONS_OPTIONS,
  onlyRemoveTypeImports: true,
  optimizeConstEnums: true,
  optimizeEnums: true,
  rewriteImportExtensions: 'rewrite',
};

const OXC_OPTIONS: OxcOptions = {
  define: DEFINE_PLUGIN,
  jsx: JSX_OPTIONS,
  typescript: TYPESCRIPT_OPTIONS,
};

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
  envDir: '..',
  oxc: OXC_OPTIONS,
  publicDir: '../public',
  resolve: {
    // Upgraded exporters require the application's OpenTelemetry API 1.10.
    dedupe: ['@opentelemetry/api'],
  },
  root: 'src',
};

const CONFIG: UserConfigFnObject = defineConfig(
  ({ mode }: ConfigEnv): UserConfig => {
    if (mode !== 'production') {
      return {
        ...USER_CONFIG,
        css: {
          preprocessorMaxWorkers: true,
        },
        oxc: {
          ...OXC_OPTIONS,
          jsx: {
            ...JSX_OPTIONS,
            development: true,
          },
        },
        plugins: [basicSsl(), ddPlugin, react()],
        server: {
          headers: {
            'document-policy': 'js-profiling',
          },
          port: 3000,
        },
        tsconfig: '../tsconfig.json', // relative to `root` ('src/')
      };
    }

    return {
      ...USER_CONFIG,
      build: {
        emptyOutDir: true,
        outDir: '../_site', // relative to `root` ('src/')
        sourcemap: true,
      },
      html: {
        cspNonce: 'nonce-quisido',
      },
      plugins: [ddPlugin, react()],
      tsconfig: '../tsconfig.build.json', // relative to `root` ('src/')
    };
  },
);

export default CONFIG;
