import { dirname, join } from 'node:path';

const { execPath: EXEC_PATH } = process;

const EXEC_DIR: string = dirname(EXEC_PATH);

const NPM_CLI_PATH: string = join(
  EXEC_DIR,
  'node_modules',
  'npm',
  'bin',
  'npm-cli.js',
);

export default function mapPlatformToNpmCommand(
  platform: NodeJS.Platform,
): readonly [string, ...(readonly string[])] {
  switch (platform) {
    case 'win32': {
      return [EXEC_PATH, NPM_CLI_PATH];
    }

    default:
      return ['npm'];
  }
}
