import { cpus } from 'node:os';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { RollupOptions } from 'rollup';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import typescript from 'rollup-plugin-typescript2';
import DEPENDENCIES from './constants/dependencies.js';
import NAME from './constants/name.js';
import PEER_DEPENDENCIES from './constants/peer-dependencies.js';
import VERSION from './constants/version.js';
import handleWarn from './utils/handle-warn.js';

const WELCOME_BANNER = `Prepacking ${NAME}@${VERSION}`;
const EXTERNAL: readonly string[] = [
  ...Array.from(DEPENDENCIES),
  ...Array.from(PEER_DEPENDENCIES),
];

console.log('');
console.log('-'.repeat(WELCOME_BANNER.length));
console.log(WELCOME_BANNER);

export default {
  cache: true,
  input: 'src/index.ts',
  onwarn: handleWarn,
  treeshake: process.env.NODE_ENV === 'production',

  external(id) {
    if (EXTERNAL.includes(id)) {
      return true;
    }

    for (const pkg of EXTERNAL) {
      if (id.startsWith(`${pkg}/`)) {
        return true;
      }
    }

    return false;
  },

  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    sourcemap: true,
  },

  plugins: [
    nodeResolve({
      extensions: ['.cjs', '.js', '.jsx', '.mjs', '.ts', '.tsx'],
      preferBuiltins: true,
    }),
    commonjs({
      extensions: ['.cjs', '.js', '.jsx'],
      sourceMap: true,
    }),
    typescript({
      abortOnError: true,
      check: false,
      clean: true,
      useTsconfigDeclarationDir: false,
      tsconfigDefaults: {
        declaration: true,
        declarationDir: 'dist',
        declarationMap: true,
        isolatedModules: true,
        module: 'ESNext',
        moduleResolution: 'Bundler',
        sourceMap: true,
        target: 'ESNext',
      },
      tsconfig:
        process.env.NODE_ENV === 'development'
          ? './tsconfig.development.json'
          : './tsconfig.json',
    }),
    terser({
      ecma: 2020,
      maxWorkers: cpus().length,
      module: true,
      sourceMap: true,
      compress: {
        directives: false,
      },
    }),
    preserveDirectives(),
  ],

  watch: {
    exclude: 'node_modules/**',
  },
} satisfies RollupOptions;
