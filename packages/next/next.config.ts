/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type NextConfig } from 'next';
import type { ExperimentalConfig } from 'next/dist/server/config-shared.js';
import { cpus } from 'node:os';
import { join } from 'node:path';
import type { Configuration as WebpackConfiguration } from 'webpack';
import getVersion from './src/utils/get-version.js';
import mapNodeEnvToOnDemandEntries from './src/utils/map-node-env-to-on-demand-entries.js';
import mapNodeEnvToOutput from './src/utils/map-node-env-to-output.js';
import optional from './src/utils/optional.js';
import validateString from './src/utils/validate-string.js';
import withNextJsBundleAnalyzer from './src/utils/with-nextjs-bundle-analyzer.js';

const CPUS_COUNT: number = cpus().length;
const handleDemandEntries = mapNodeEnvToOnDemandEntries(process.env.NODE_ENV);

export default withNextJsBundleAnalyzer({
  assetPrefix: '', // same domain
  basePath: '', // deployed application pathname
  compress: true,
  distDir: '.next',
  generateBuildId: getVersion,
  ...optional('onDemandEntries', handleDemandEntries),
  output: mapNodeEnvToOutput(process.env.NODE_ENV),
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  skipTrailingSlashRedirect: false,
  trailingSlash: true,

  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },

  env: {
    CLARITY_TAG: validateString(process.env['CLARITY_TAG']),
    CLOUD_PLATFORM: validateString(process.env['CLOUD_PLATFORM']),
    CLOUD_PROVIDER: validateString(process.env['CLOUD_PROVIDER']),
    DD_APPLICATION_ID: validateString(process.env['DD_APPLICATION_ID']),
    DD_CLIENT_TOKEN: validateString(process.env['DD_CLIENT_TOKEN']),
    SENTRY_ENVIRONMENT: validateString(process.env['SENTRY_ENVIRONMENT']),
    WHOAMI: validateString(process.env['WHOAMI']),
    CLOUDWATCH_RUM_APPLICATION_ID: validateString(
      process.env['CLOUDWATCH_RUM_APPLICATION_ID'],
    ),
    CLOUDWATCH_RUM_GUEST_ROLE_ARN: validateString(
      process.env['CLOUDWATCH_RUM_GUEST_ROLE_ARN'],
    ),
    CLOUDWATCH_RUM_IDENTITY_POOL_ID: validateString(
      process.env['CLOUDWATCH_RUM_IDENTITY_POOL_ID'],
    ),
    DEPLOYMENT_ENVIRONMENT: validateString(
      process.env['DEPLOYMENT_ENVIRONMENT'],
    ),
    GOOGLE_ANALYTICS_TRACKING_ID: validateString(
      process.env['GOOGLE_ANALYTICS_TRACKING_ID'],
    ),
    PATREON_OAUTH_CLIENT_ID: validateString(
      process.env['PATREON_OAUTH_CLIENT_ID'],
    ),
    PATREON_OAUTH_REDIRECT_URI: validateString(
      process.env['PATREON_OAUTH_REDIRECT_URI'],
    ),
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    // adjustFontFallbacks: true,
    // adjustFontFallbacksWithSizeAdjust: true,
    // bundlePagesExternals: true,
    // cacheMaxMemorySize: Number.POSITIVE_INFINITY,
    // disablePostcssPresetEnv: true,
    cpus: CPUS_COUNT,
    craCompat: false,
    // fallbackNodePolyfills: false,
    forceSwcTransforms: true,
    // fullySpecified: true,
    gzipSize: true,
    // largePageDataBytes: 1024,
    nextScriptWorkers: true,
    optimisticClientCache: true,
    optimizeCss: true,
    optimizeServerReact: true,
    outputFileTracingRoot: join(__dirname, '..', '..'),
    ppr: process.env.NODE_ENV !== 'production',
    serverMinification: true,
    serverSourceMaps: true,
    // staticWorkerRequestDeduping: true,
    strictNextHead: true,
    // swcMinify: true,
    // swcTraceProfiling: true,
    taint: true,
    // typedRoutes: true,
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
    webpackBuildWorker: true,
    workerThreads: true,

    /*
    sri: {
      algorithm: 'sha512',
    },
    */

    /**
     * Yarn PNP is not supported yet.
     * https://github.com/vercel/next.js/issues/59225
     * turbotrace: {
     *   memoryLimit: 64 * 1024,
     * },
     */
  } satisfies ExperimentalConfig,

  images: {
    loader: 'custom',
    loaderFile: './scripts/imagekit-loader/index.js',
  },

  typescript: {
    // TODO: 🔥🔥🔥 CHANGE MY BACK TO `false`! 🔥🔥🔥
    ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.prepack.json',
  },

  // Add support for fully-qualified ESM imports.
  // https://github.com/vercel/next.js/issues/41961
  webpack(config: WebpackConfiguration): WebpackConfiguration {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensionAlias: {
          '.js': ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    };
  },
} satisfies NextConfig) satisfies NextConfig;
