import type { NextConfig } from 'next';
import getVersion from './src/utils/get-version';

export default {
  generateBuildId: getVersion,
  trailingSlash: true,
} satisfies NextConfig;
