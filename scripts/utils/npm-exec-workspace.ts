import { execFileSync } from 'node:child_process';
import getNpmCommand from './get-npm-command.js';
import handleNpmExecWorkspaceError from './handle-npm-exec-workspace-error.js';
import logCommand from './log-command.js';
import retry from './retry.js';

// If the build becomes unreliable again, we can set this back to 3 attempts.
// But right now, it's consistent; and I don't want failed TESTS to run >1 time.
const ATTEMPTS = 1;
const [FILE, ...ARGS] = getNpmCommand();

export default function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): string {
  logCommand('npm', ...script, `--workspace=packages/${workspaceDirectory}`);

  try {
    return retry(ATTEMPTS, (): string =>
      execFileSync(
        FILE,
        [...ARGS, ...script, `--workspace=packages/${workspaceDirectory}`],
        { encoding: 'utf-8', shell: false, stdio: 'pipe' },
      ),
    );
  } catch (err: unknown) {
    return handleNpmExecWorkspaceError(err, script);
  }
}
