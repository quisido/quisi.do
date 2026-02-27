import {
  type ChildProcess,
  type Serializable,
  spawn,
} from 'node:child_process';
import getScriptCommand from './get-script-command.js';
import handleNpmExecWorkspaceError from './handle-npm-exec-workspace-error.js';
import logCommand from './log-command.js';

const [FILE, ...ARGS] = getScriptCommand();
const MAX_CONSOLE_LENGTH = 80;

const spawnAsync = async (
  command: string,
  args: readonly string[],
): Promise<string> => {
  const childProcess: ChildProcess = spawn(command, args, {
    shell: false,
    stdio: ['inherit', 'pipe', 'pipe'],
    timeout: 300000, // 5 minutes
  });

  const { stderr, stdout } = childProcess;
  if (stderr === null) {
    throw new Error(
      `Expected child process to have an error stream for ${command} ${args.join(' ')}.`,
    );
  }

  if (stdout === null) {
    throw new Error(
      `Expected child process to have an output stream for ${command} ${args.join(' ')}.`,
    );
  }

  const stderrChunks: string[] = [];
  const stdoutChunks: string[] = [];

  stderr.on('data', (chunk: Serializable): void => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    globalThis.console.error(chunk.toString());
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    stderrChunks.push(chunk.toString());
  });

  stdout.on('data', (chunk: Serializable): void => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    globalThis.console.log(chunk.toString());
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    stdoutChunks.push(chunk.toString());
  });

  return new Promise((resolve, reject): void => {
    childProcess.on(
      'exit',
      (code: number | null, signal: NodeJS.Signals | null) => {
        stderr.destroy();
        stdout.destroy();

        if (code === 0) {
          resolve(stdoutChunks.join(''));
        } else {
          const getReason = (): string => {
            if (code !== null) {
              return `exit code ${code}`;
            }

            if (signal !== null) {
              return `signal ${signal}`;
            }

            return 'unknown reason';
          };

          const reason: string = getReason();

          reject(
            new Error(
              `Command "${command} ${args.join(' ')}" failed (${reason}):
${stdoutChunks.join('')}
${stderrChunks.join('')}`,
            ),
          );
        }
      },
    );
  });
};

export default async function npmExecWorkspace(
  workspaceDirectory: string,
  ...script: string[]
): Promise<string> {
  globalThis.console.log(' ');
  globalThis.console.log('-'.repeat(MAX_CONSOLE_LENGTH));
  globalThis.console.log(' ');
  logCommand('npm', ...script, `--workspace=packages/${workspaceDirectory}`);

  try {
    return await spawnAsync(FILE, [
      ...ARGS,
      ...script,
      `--workspace=packages/${workspaceDirectory}`,
    ]);
  } catch (err: unknown) {
    return handleNpmExecWorkspaceError(err, script);
  }
}
