import NextBundleAnalyzer from '@next/bundle-analyzer';
import { type NextConfig } from 'next';
import getVersion from './src/utils/get-version';

const getOnDemandEntries = (): NextConfig['onDemandEntries'] => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  return {
    maxInactiveAge: Number.POSITIVE_INFINITY,
    pagesBufferLength: Number.POSITIVE_INFINITY,
  };
};

const mapNodeEnvToOutput = (
  env: NodeJS.ProcessEnv['NODE_ENV'],
): NextConfig['output'] => {
  switch (env) {
    case 'development':
    case 'test':
      return;
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
  basePath: '/', // deployed application pathname
  compress: true,
  distDir: '.next',
  generateBuildId: getVersion,
  onDemandEntries: getOnDemandEntries(),
  output: mapNodeEnvToOutput(process.env.NODE_ENV),
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  skipTrailingSlashRedirect: false,
  trailingSlash: true,

  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },

  env: {
    /**
     *   Next incorrectly types `env` as `Record<string, string>` when it should
     * be `Record<string, string | undefined>`.
     * https://github.com/vercel/next.js/pull/59200
     */
    CLOUDFLARE_ANALYTICS_ORIGIN: process.env.CLOUDFLARE_ANALYTICS_ORIGIN as string,
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY as string,
    GITHUB_SHA: process.env.GITHUB_SHA as string,
    NODE_ENV: process.env.NODE_ENV,
    NPM_DOWNLOADS: process.env.NPM_DOWNLOADS as string,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    deploymentId: getVersion(),
    useDeploymentId: true,
  },

  images: {
    loader: 'cloudinary',
  },

  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.prepack.json',
  },
} satisfies NextConfig) satisfies NextConfig;
