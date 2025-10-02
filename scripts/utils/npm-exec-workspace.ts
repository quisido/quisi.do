import { execFileSync } from 'node:child_process';
import isSpawnSyncReturns from './is-spawn-sync-returns.js';
import isString from './is-string.js';
import retry from './retry.js';

const ATTEMPTS = 3;
const MAX_LINE_LENGTH = 80;

const isActionableMessage = (message: string): boolean =>
  !message.startsWith('npm error A complete log of this run can be found in: ');

export default function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): string {
  const words: string[] = [
    'npm',
    ...script,
    `--workspace=packages/${workspaceDirectory}`,
  ];

  const logLineChunks: string[] = [];
  let logLineLength = 0;
  for (const word of words) {
    if (logLineLength === 0) {
      logLineChunks.push(word);
      logLineLength += word.length;
      continue;
    }

    if (logLineLength + word.length + 3 <= MAX_LINE_LENGTH) {
      logLineChunks.push(' ');
      logLineChunks.push(word);
      logLineLength += word.length + 1;
      continue;
    }

    logLineChunks.push(' \\\n    ');
    logLineChunks.push(word);
    logLineLength = word.length;
  }

  console.log(logLineChunks.join(''));

  try {
    return retry(ATTEMPTS, (): string =>
      execFileSync(
        'npm',
        [...script, `--workspace=packages/${workspaceDirectory}`],
        { encoding: 'utf-8', shell: true, stdio: 'pipe' },
      ),
    );
  } catch (err: unknown) {
    if (!isSpawnSyncReturns(err)) {
      throw err;
    }

    if (!Array.isArray(err.stderr) || !err.stderr.every(isString)) {
      throw new Error(JSON.stringify(err.stderr), { cause: err });
    }

    const lastActionableMessage: string | undefined = err.stderr
      .filter(isActionableMessage)
      .pop();

    if (typeof lastActionableMessage === 'undefined') {
      throw err.error ?? err;
    }

    throw new Error(lastActionableMessage, { cause: err });
  }
}
