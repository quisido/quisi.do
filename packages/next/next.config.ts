import { type NextConfig } from 'next';
import { type ImageConfig } from 'next/dist/shared/lib/image-config';
import getVersion from './src/utils/get-version';
import mapRowsPerPageOptionsToMuiRowsPerPageOptions from './src/design-systems/mui/components/table/utils/map-rows-per-page-options-to-mui-rows-per-page-options';

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

const getOutput = (): 'export' | 'standalone' => {
  if (process.env.NODE_ENV === 'test') {
    return 'standalone';
  }

  return 'export';
};

export default {
  generateBuildId: getVersion,
  images: getImageConfig(),
  output: getOutput(),
  skipTrailingSlashRedirect: false,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
} satisfies NextConfig;
