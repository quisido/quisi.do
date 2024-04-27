import nextBundleAnalyzer from '@next/bundle-analyzer';
import { type NextConfig } from 'next';

const withNextJsBundleAnalyzer = nextBundleAnalyzer({
  enabled: true,
  logLevel: 'silent',
  openAnalyzer: false,

  // Use 'json' for a JSON file.
  analyzerMode: 'static',
}) satisfies (config: NextConfig) => NextConfig;

export default withNextJsBundleAnalyzer;
