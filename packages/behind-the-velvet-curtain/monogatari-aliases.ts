import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { type AliasOptions } from 'vite';

const CURRENT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const MONOGATARI_CORE_DIRECTORY = resolve(
  CURRENT_DIRECTORY,
  '../../node_modules/@monogatari/core',
);

export const MONOGATARI_ALIASES: AliasOptions = [
  {
    find: '@monogatari/core/dist/engine/core/monogatari.css',
    replacement: resolve(
      MONOGATARI_CORE_DIRECTORY,
      'dist/engine/core/monogatari.css',
    ),
  },
  {
    find: '@monogatari/core',
    replacement: resolve(MONOGATARI_CORE_DIRECTORY, 'src/index.ts'),
  },
];
