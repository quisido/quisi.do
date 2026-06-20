import { VitePWA as vitePWA } from 'vite-plugin-pwa';
import {
  type ConfigEnv,
  defineConfig,
  type PluginOption,
  type UserConfig,
  type UserConfigFnObject,
} from 'vite';
import { MONOGATARI_ALIASES } from './monogatari-aliases.js';

const USER_CONFIG: UserConfig = {
  base: './',
  envDir: '../',
  publicDir: '../public/',
  resolve: {
    alias: MONOGATARI_ALIASES,
  },
  root: './src/',
};

const DEVELOPMENT_USER_CONFIG: UserConfig = {
  ...USER_CONFIG,
  css: {
    preprocessorMaxWorkers: true,
  },
  plugins: [],
  server: {
    headers: {
      'document-policy': 'js-profiling',
    },
    host: true,
    port: 3001,
  },
};

const PRODUCTION_USER_CONFIG: UserConfig = {
  ...USER_CONFIG,
  build: {
    emptyOutDir: true,
    outDir: '../dist/',
    sourcemap: true,
    target: 'esnext',
  },
  plugins: [
    ...(vitePWA({
      includeAssets: [
        'apple-touch-icon.png',
        'favicon.svg',
        'mask-icon.svg',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'site.webmanifest',
      ],
      injectRegister: false,
      manifest: false,
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{css,html,js,png,svg,webmanifest}'],
        maximumFileSizeToCacheInBytes: 3_000_000,
        sourcemap: true,
      },
    }) as unknown as readonly PluginOption[]),
  ],
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
