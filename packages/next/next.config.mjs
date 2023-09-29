// TODO: Use Babel to import './next.config.ts'.

/** @type {import('next').NextConfig} */
export default {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  generateBuildId() {
    return process.env.REACT_APP_GITHUB_SHA ?? 'alpha';
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
