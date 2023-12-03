import NextBundleAnalyzer from '@next/bundle-analyzer';
import { type NextConfig } from 'next';

const withNextJsBundleAnalyzer = NextBundleAnalyzer({
  analyzerMode: 'static', // Use 'json' for a JSON file.
  enabled: true,
  openAnalyzer: false,
}) satisfies (config: NextConfig) => NextConfig;

export default withNextJsBundleAnalyzer;
