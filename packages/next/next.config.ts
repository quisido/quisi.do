import { type NextConfig } from 'next';
import getVersion from './src/utils/get-version';

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

export default {
  generateBuildId: getVersion,
  output: mapNodeEnvToOutput(process.env.NODE_ENV),
  skipTrailingSlashRedirect: false,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
} satisfies NextConfig;
