import { type NextConfig } from 'next';
import getVersion from './src/utils/get-version';

export default {
  generateBuildId: getVersion,
  output: 'export', // static site generation
  skipTrailingSlashRedirect: false,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
} satisfies NextConfig;
