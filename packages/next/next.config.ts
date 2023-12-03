import { type NextConfig } from 'next';
import { cpus } from 'node:os';
import { join } from 'node:path';
import getVersion from './src/utils/get-version';
import mapNodeEnvToOnDemandEntries from './src/utils/map-node-env-to-on-demand-entries';
import mapNodeEnvToOutput from './src/utils/map-node-env-to-output';
import mapProcessEnvToNextJsEnv from './src/utils/map-process-env-to-nextjs-env';
import withNextJsBundleAnalyzer from './src/utils/with-nextjs-bundle-analyzer';

const CPUS_COUNT: number = cpus().length;

export default withNextJsBundleAnalyzer({
  assetPrefix: '', // same domain
  basePath: '', // deployed application pathname
  compress: true,
  distDir: '.next',
  env: mapProcessEnvToNextJsEnv(process.env),
  generateBuildId: getVersion,
  onDemandEntries: mapNodeEnvToOnDemandEntries(process.env.NODE_ENV),
  output: mapNodeEnvToOutput(process.env.NODE_ENV),
  outputFileTracing: false, // Yarn PNP is not yet supported.
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  skipTrailingSlashRedirect: false,
  trailingSlash: true,

  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    // adjustFontFallbacks: true,
    // adjustFontFallbacksWithSizeAdjust: true,
    // bundlePagesExternals: true,
    deploymentId: getVersion(),
    // disablePostcssPresetEnv: true,
    cpus: CPUS_COUNT,
    craCompat: false,
    // fallbackNodePolyfills: false,
    forceSwcTransforms: true,
    // fullySpecified: true,
    gzipSize: true,
    isrMemoryCacheSize: Number.POSITIVE_INFINITY,
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
    useDeploymentId: true,
    webpackBuildWorker: true,
    webVitalsAttribution: ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"],
    workerThreads: true,

    // sri: {
    //   algorithm: 'sha512',
    // },

    turbotrace: {
      memoryLimit: 64 * 1024,
    },
  },

  images: {
    loader: 'custom',
    loaderFile: './scripts/imagekit-loader/index.js',
  },

  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.prepack.json',
  },
} satisfies NextConfig) satisfies NextConfig;
