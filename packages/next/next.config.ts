import { type NextConfig } from 'next';
import getVersion from './src/utils/get-version';

export default {
  generateBuildId: getVersion,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
} satisfies NextConfig;
