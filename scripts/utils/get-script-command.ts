import { dirname, join } from 'node:path';
import process from 'node:process';

const { execPath: EXEC_PATH, platform: PLATFORM } = process;

export default function getScriptCommand(): readonly [
  string,
  ...(readonly string[]),
] {
  // NPM on Windows is actually `node .../npm-cli.js`.
  if (PLATFORM === 'win32' && /node(?:\.exe)?$/iu.test(EXEC_PATH)) {
    const execDir: string = dirname(EXEC_PATH);
    const npmCliPath: string = join(
      execDir,
      'node_modules',
      'npm',
      'bin',
      'npm-cli.js',
    );
    return [EXEC_PATH, npmCliPath];
  }

  return [EXEC_PATH];
}
