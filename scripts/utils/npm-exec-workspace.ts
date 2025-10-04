import { execFileSync } from 'node:child_process';
import isSpawnSyncReturns from './is-spawn-sync-returns.js';
import isString from './is-string.js';
import logCommand from './log-command.js';
import retry from './retry.js';

const ATTEMPTS = 3;

const isActionableMessage = (message: string): boolean =>
  !message.startsWith('npm error A complete log of this run can be found in: ');

export default function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): string {
  logCommand('npm', ...script, `--workspace=packages/${workspaceDirectory}`);

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
