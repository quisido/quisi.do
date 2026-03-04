import { dirname, join } from 'node:path';

export const NPX_COMMAND: readonly [string, ...(readonly string[])] = (() => {
  switch (process.platform) {
    case 'win32': {
      const npxCliPath: string = join(
        dirname(process.execPath),
        'node_modules',
        'npm',
        'bin',
        'npx-cli.js',
      );

      return [process.execPath, npxCliPath];
    }

    default:
      return ['npx'];
  }
})();
