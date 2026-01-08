import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import getNpmCommand from './get-npm-command.js';
import handleNpmExecWorkspaceError from './handle-npm-exec-workspace-error.js';
import logCommand from './log-command.js';

const EMPTY = 0;
const [FILE, ...ARGS] = getNpmCommand();
const execFileAsync = promisify(execFile);

export default async function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): Promise<string> {
  logCommand('npm', ...script, `--workspace=packages/${workspaceDirectory}`);

  try {
    const { stderr, stdout } = await execFileAsync(
      FILE,
      [...ARGS, ...script, `--workspace=packages/${workspaceDirectory}`],
      {
        encoding: 'buffer',
        shell: false,
      },
    );

    if (stderr.length > EMPTY) {
      throw new Error(stderr.toString('utf8'));
    }

    return stdout.toString('utf8');
  } catch (err: unknown) {
    return handleNpmExecWorkspaceError(err, script);
  }
}
