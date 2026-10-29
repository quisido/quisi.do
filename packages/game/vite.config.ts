import basicSsl from '@vitejs/plugin-basic-ssl';
import ddPlugin from 'dd-trace/esbuild';
import {
  type ConfigEnv,
  defineConfig,
  type OxcOptions,
  type UserConfig,
  type UserConfigFnObject,
} from 'vite';

// `IsolatedDeclarationsOptions` is typed by `rolldown` but not re-exported by `vite`.
type IsolatedDeclarationsOptions = Exclude<
  TypeScriptOptions['declaration'],
  undefined
>;

// `JsxOptions` is typed by `rolldown` but not re-exported by `vite`.
type JsxOptions = Exclude<OxcOptions['jsx'], string | undefined>;

// `TypeScriptOptions` is typed by `rolldown` but not re-exported by `vite`.
type TypeScriptOptions = Exclude<OxcOptions['typescript'], undefined>;

/**
 * @see {@link https://oxc.rs/docs/guide/usage/transformer/global-variable-replacement#define}
 */
const DEFINE_PLUGIN: Record<string, string> = {};

const ISOLATED_DECLARATIONS_OPTIONS: IsolatedDeclarationsOptions = {
  sourcemap: true,
};

/** @see {@link https://oxc.rs/docs/guide/usage/transformer/jsx} */
const JSX_OPTIONS: JsxOptions = {
  refresh: true,
  runtime: 'automatic',
};

/** @see {@link https://oxc.rs/docs/guide/usage/transformer/typescript} */
const TYPESCRIPT_OPTIONS: TypeScriptOptions = {
  allowNamespaces: false,
  declaration: ISOLATED_DECLARATIONS_OPTIONS,
  onlyRemoveTypeImports: true,
  optimizeConstEnums: true,
  optimizeEnums: true,
  rewriteImportExtensions: 'rewrite',
};

const OXC_OPTIONS: OxcOptions = {
  define: DEFINE_PLUGIN,
  jsx: JSX_OPTIONS,
  typescript: TYPESCRIPT_OPTIONS,
};

const USER_CONFIG: UserConfig = {
  base: '/',
  envDir: '..',
  oxc: OXC_OPTIONS,
  publicDir: '../public',
  root: 'src',
};

const CONFIG: UserConfigFnObject = defineConfig(
  (env: ConfigEnv): UserConfig => {
    if (env.mode !== 'production') {
      return {
        ...USER_CONFIG,
        css: {
          preprocessorMaxWorkers: true,
        },
        oxc: {
          ...OXC_OPTIONS,
          jsx: {
            ...JSX_OPTIONS,
            development: true,
          },
        },
        plugins: [basicSsl(), ddPlugin],
        server: {
          headers: {
            'document-policy': 'js-profiling',
          },
          port: 3000,
        },
        tsconfig: '../tsconfig.json', // relative to `root` ('src/')
      };
    }

    return {
      ...USER_CONFIG,
      build: {
        emptyOutDir: true,
        outDir: '../dist/', // relative to `root` ('src/')
        sourcemap: true,
      },
      oxc: {
        ...OXC_OPTIONS,
        jsx: {
          ...JSX_OPTIONS,
          development: false,
        },
      },
      plugins: [],
    };
  },
);

export default CONFIG;
