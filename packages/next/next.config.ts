import NextBundleAnalyzer from '@next/bundle-analyzer';
import { type NextConfig } from 'next';
import { cpus } from 'node:os';
import { join } from 'node:path';
import getVersion from './src/utils/get-version';

const CPUS_COUNT: number = cpus().length;

const getOnDemandEntries = (): NextConfig['onDemandEntries'] => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  return {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 1024,
  };
};

const reduceDictEntriesToRecord = <T>(
  record: Record<string, T>,
  [key, value]: [string, T | undefined],
): Record<string, T> => {
  if (typeof value === 'undefined') {
    return record;
  }

  return {
    ...record,
    [key]: value,
  };
};

const mapDictToRecord = <T>(dict: NodeJS.Dict<T>): Record<string, T> => {
  return Object.entries(dict).reduce(reduceDictEntriesToRecord, {});
};

const mapNodeEnvToOutput = (
  env: NodeJS.ProcessEnv['NODE_ENV'],
): NextConfig['output'] => {
  switch (env) {
    case 'development':
    case 'test':
      return 'standalone';
    case 'production':
      return 'export';
  }
};

const withBundleAnalyzer = NextBundleAnalyzer({
  analyzerMode: 'static', // Use 'json' for a JSON file.
  enabled: true,
  openAnalyzer: false,
});

export default withBundleAnalyzer({
  assetPrefix: '', // same domain
  basePath: '', // deployed application pathname
  compress: true,
  distDir: '.next',
  generateBuildId: getVersion,
  onDemandEntries: getOnDemandEntries(),
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

  env: mapDictToRecord({
    ...process.env,
    __COMPAT_LAYER: undefined,
    __NEXT_PROCESSED_ENV: undefined,
    NEXT_RUNTIME: undefined,
    NODE_ENV: undefined,
    NODE_OPTIONS: undefined,
  }),

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
