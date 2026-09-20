import basicSsl from '@vitejs/plugin-basic-ssl';
import {
  type ConfigEnv,
  defineConfig,
  type UserConfig,
  type UserConfigFnObject,
} from 'vite';

const USER_CONFIG: UserConfig = {
  base: '/',
  envDir: '../',
  publicDir: '../public',
  root: 'src',
};

const DEVELOPMENT_USER_CONFIG: UserConfig = {
  ...USER_CONFIG,
  css: {
    preprocessorMaxWorkers: true,
  },
  plugins: [basicSsl()],
  server: {
    headers: {
      'document-policy': 'js-profiling',
    },
    port: 3000,
  },
};

const PRODUCTION_USER_CONFIG: UserConfig = {
  ...USER_CONFIG,
  build: {
    emptyOutDir: true,
    outDir: '../_site', // relative to `root` ('src/')
    sourcemap: true,
  },
  html: {
    cspNonce: 'nonce-quisido',
  },
  plugins: [],
};

const CONFIG: UserConfigFnObject = defineConfig(
  ({ mode }: ConfigEnv): UserConfig => {
    if (mode !== 'production') {
      return DEVELOPMENT_USER_CONFIG;
    }

    return PRODUCTION_USER_CONFIG;
  },
);

export default CONFIG;
