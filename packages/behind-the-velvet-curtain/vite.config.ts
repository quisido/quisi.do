import { VitePWA as vitePWA } from 'vite-plugin-pwa';
import {
  type ConfigEnv,
  defineConfig,
  type ESBuildOptions,
  type PluginOption,
  type UserConfig,
  type UserConfigFnObject,
} from 'vite';
import buildTSConfig from './tsconfig.build.json' with { type: 'json' };

const ESBUILD_OPTIONS: ESBuildOptions = {
  color: true,
  sourcesContent: true,
};

const USER_CONFIG: UserConfig = {
  base: './',
  envDir: '../',
  esbuild: ESBUILD_OPTIONS,
  publicDir: '../public/',
  root: './src/',
};

const DEVELOPMENT_USER_CONFIG: UserConfig = {
  ...USER_CONFIG,
  css: {
    preprocessorMaxWorkers: true,
  },
  esbuild: {
    ...ESBUILD_OPTIONS,
    lineLimit: 80,
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
    sourcemap: 'both',
    sourceRoot: './src/',
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
  esbuild: {
    ...ESBUILD_OPTIONS,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    sourceRoot: buildTSConfig.compilerOptions.sourceRoot,
    tsconfigRaw: buildTSConfig as Exclude<
      ESBuildOptions['tsconfigRaw'],
      undefined
    >,
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
