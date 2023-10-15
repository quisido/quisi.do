import { type NextConfig } from 'next';
import { type ImageConfig } from 'next/dist/shared/lib/image-config';
import getVersion from './src/utils/get-version';

const getImageConfig = (): ImageConfig => {
  /*
  if (process.env.NODE_ENV === 'production') {
    return {
      loader: 'cloudinary',
      path: 'https://res.cloudinary.com/ugwutotheeshoes/image/upload/',
    };
  }
  */
  return {
    loader: 'custom',
    loaderFile: './scripts/next-images-loader.js',
  };
};

export default {
  generateBuildId: getVersion,
  images: getImageConfig(),
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
