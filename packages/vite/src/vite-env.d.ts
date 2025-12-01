/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CLARITY_TAG?: string | undefined;
  readonly CLOUD_ACCOUNT_ID?: string | undefined;
  readonly CLOUD_PLATFORM?: string | undefined;
  readonly CLOUD_PROVIDER?: string | undefined;
  readonly CLOUDFLARE_ANALYTICS_ORIGIN?: string | undefined;
  readonly CLOUDFLARE_INSIGHTS_TOKEN?: string | undefined;
  readonly CSP_ORIGIN?: string | undefined;
  readonly CYPRESS_SCREENSHOTS_SUBFOLDER?: string | undefined;
  readonly DASHBOARD_ENDPOINT?: string | undefined;
  readonly DD_APPLICATION_ID?: string | undefined;
  readonly DD_CLIENT_TOKEN?: string | undefined;
  readonly DEPLOYMENT_ENVIRONMENT?: string | undefined;
  readonly GITHUB_REPOSITORY?: string | undefined;
  readonly GITHUB_SHA?: string | undefined;
  readonly GOOGLE_ANALYTICS_TRACKING_ID?: string | undefined;
  readonly HONEYCOMB_API_KEY?: string | undefined;
  readonly METICULOUS_RECORDING_TOKEN?: string | undefined;
  readonly MIXPANEL_TOKEN?: string | undefined;
  readonly NEW_RELIC_LICENSE_KEY?: string | undefined;
  readonly NODE_ENV?: NodeJS.ProcessEnv['NODE_ENV'];
  readonly NYC_REPORT_DIR?: string | undefined;
  readonly PATREON_OAUTH_CLIENT_ID?: string | undefined;
  readonly PATREON_OAUTH_REDIRECT_URI?: string | undefined;
  readonly POSTHOG_HOST?: string | undefined;
  readonly POSTHOG_KEY?: string | undefined;
  readonly SENTRY_ENVIRONMENT?: string | undefined;
  readonly WHOAMI?: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// This line makes the type of ImportMetaEnv strict to disallow unknown keys.
interface ViteTypeOptions {}
