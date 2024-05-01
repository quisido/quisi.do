import { type NextConfig } from 'next';
import type { ExperimentalConfig } from 'next/dist/server/config-shared.js';
import { cpus } from 'node:os';
import { join } from 'node:path';
import getVersion from './src/utils/get-version.js';
import mapNodeEnvToOnDemandEntries from './src/utils/map-node-env-to-on-demand-entries.js';
import mapNodeEnvToOutput from './src/utils/map-node-env-to-output.js';
import optional from './src/utils/optional.js';
import validateString from './src/utils/validate-string.js';
import withNextJsBundleAnalyzer from './src/utils/with-nextjs-bundle-analyzer.js';

const BASE = 10;
const CPUS_COUNT: number = cpus().length;
const handleDemandEntries = mapNodeEnvToOnDemandEntries(process.env.NODE_ENV);

const getCpus = (): number => {
  const cpus: string | undefined = process.env['CPUS'];
  if (typeof cpus === 'undefined') {
    return CPUS_COUNT;
  }
  return parseInt(cpus, BASE);
};

const reduceEnvironmentVariableNamesToRecord = (
  record: Record<string, string | undefined>,
  name: string,
): Record<string, string | undefined> => ({
  ...record,
  [name]: validateString(process.env[name]),
});

const mapEnvironmentVariableNamesToRecord = (
  names: readonly string[],
): Record<string, string | undefined> =>
  names.reduce(reduceEnvironmentVariableNamesToRecord, {});

export default withNextJsBundleAnalyzer({
  assetPrefix: '', // Same domain
  basePath: '', // Deployed application pathname
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

  env: mapEnvironmentVariableNamesToRecord([
    'CLARITY_TAG',
    'CLOUD_ACCOUNT_ID',
    'CLOUD_PLATFORM',
    'CLOUD_PROVIDER',
    'CLOUDWATCH_RUM_APPLICATION_ID',
    'CLOUDWATCH_RUM_GUEST_ROLE_ARN',
    'CLOUDWATCH_RUM_IDENTITY_POOL_ID',
    'DD_APPLICATION_ID',
    'DD_CLIENT_TOKEN',
    'DEPLOYMENT_ENVIRONMENT',
    'GOOGLE_ANALYTICS_TRACKING_ID',
    'HONEYCOMB_API_KEY',
    'PATREON_OAUTH_CLIENT_ID',
    'PATREON_OAUTH_REDIRECT_URI',
    'SENTRY_ENVIRONMENT',
    'WHOAMI',
  ]),

  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    /*
     * AdjustFontFallbacks: true,
     * adjustFontFallbacksWithSizeAdjust: true,
     * bundlePagesExternals: true,
     * cacheMaxMemorySize: Number.POSITIVE_INFINITY,
     * disablePostcssPresetEnv: true,
     */
    cpus: getCpus(),
    craCompat: false,
    // FallbackNodePolyfills: false,
    forceSwcTransforms: true,
    // FullySpecified: true,
    gzipSize: true,
    // LargePageDataBytes: 1024,
    nextScriptWorkers: true,
    optimisticClientCache: true,
    optimizeCss: true,
    optimizeServerReact: true,
    outputFileTracingRoot: join(__dirname, '..', '..'),
    // Ppr: process.env.NODE_ENV !== 'production',
    serverMinification: true,
    serverSourceMaps: true,
    // StaticWorkerRequestDeduping: true,
    strictNextHead: true,
    swcMinify: true,
    swcTraceProfiling: true,
    taint: true,
    // TypedRoutes: true,
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
    // WebpackBuildWorker: undefined,
    workerThreads: true,

    extensionAlias: {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.jsx': ['.tsx', '.jsx'],
    },

    /*
     *Sri: {
     *  algorithm: 'sha512',
     *},
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
} satisfies NextConfig) satisfies NextConfig;
