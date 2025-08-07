import basicSsl from '@vitejs/plugin-basic-ssl';
import {
  defineConfig,
  type ConfigEnv,
  type ESBuildOptions,
  type UserConfig,
} from 'vite';
import buildTSConfig from './tsconfig.build.json' with { type: 'json' };

const ESBUILD_OPTIONS: ESBuildOptions = {
  color: true,
  jsx: 'preserve',
  sourcesContent: true,
};

const USER_CONFIG: UserConfig = {
  base: '/',
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
    jsxDev: true,
    lineLimit: 80,
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
    sourceRoot: './src/',
    sourcemap: 'both',
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
    outDir: '../dist/',
    sourcemap: true,
  },
  esbuild: {
    ...ESBUILD_OPTIONS,
    jsxDev: false,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    sourceRoot: buildTSConfig.compilerOptions.sourceRoot,
    tsconfigRaw: buildTSConfig as Exclude<
      ESBuildOptions['tsconfigRaw'],
      undefined
    >,
  },
  plugins: [],
};

export default defineConfig((env: ConfigEnv): UserConfig => {
  if (env.mode !== 'production') {
    return DEVELOPMENT_USER_CONFIG;
  }

  return PRODUCTION_USER_CONFIG;
});
