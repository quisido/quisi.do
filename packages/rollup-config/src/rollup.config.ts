import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { LoggingFunction, RollupLog, RollupOptions } from 'rollup';
import typescript2 from 'rollup-plugin-typescript2';
import DEPENDENCIES from './constants/dependencies.js';
import PEER_DEPENDENCIES from './constants/peer-dependencies.js';

const EXTERNAL: readonly string[] = [
  ...Array.from(DEPENDENCIES),
  ...Array.from(PEER_DEPENDENCIES),
];

export default {
  cache: true,
  input: 'src/index.ts',
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
    chunkFileNames: 'chunk-[hash].js',
    dir: './dist/',
    entryFileNames: 'index.js',
    format: 'es',
    sourcemap: true,
  },

  onwarn(warning: RollupLog, warn: LoggingFunction): void {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
      return;
    }
    warn(warning);
  },

  plugins: [
    nodeResolve({
      extensions: ['.cjs', '.js', '.jsx', '.mjs', '.ts', '.tsx'],
      preferBuiltins: true,
    }),
    commonjs({
      extensions: ['.cjs', '.js', '.jsx'],
    }),
    typescript2({
      check: process.env.NODE_ENV === 'production',
      useTsconfigDeclarationDir: true,
      tsconfig:
        process.env.NODE_ENV === 'development'
          ? './tsconfig.development.json'
          : './tsconfig.json',
    }),
  ],

  watch: {
    exclude: 'node_modules/**',
  },
} satisfies RollupOptions;
