import { execFileSync } from 'node:child_process';
import isString from './is-string.js';
import isSpawnSyncReturns from './is-spawn-sync-returns.js';

const isActionableMessage = (message: string): boolean =>
  !message.startsWith('npm error A complete log of this run can be found in: ');

export default function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): string {
  console.log(
    ['npm', ...script, `--workspace=packages/${workspaceDirectory}`].join(' '),
  );

  try {
    const result: string = execFileSync(
      'npm',
      [...script, `--workspace=packages/${workspaceDirectory}`],
      { encoding: 'utf-8', shell: true, stdio: 'pipe' },
    );

    return result;
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
