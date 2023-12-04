import NextBundleAnalyzer from '@next/bundle-analyzer';
import { type NextConfig } from 'next';

const withNextJsBundleAnalyzer = NextBundleAnalyzer({
  analyzerMode: 'static', // Use 'json' for a JSON file.
  enabled: true,
  // https://github.com/vercel/next.js/pull/59228
  // logLevel: 'silent',
  openAnalyzer: false,
}) satisfies (config: NextConfig) => NextConfig;

export default withNextJsBundleAnalyzer;
