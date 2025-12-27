import {
  type ChildProcess,
  execFile,
  type ExecFileException,
} from 'node:child_process';
import { EOL } from 'node:os';
import hasToStringMethod from './has-to-string-method.js';

export interface ExecutionResult {
  readonly exitCode: number;
  readonly stderr: string;
  readonly stdout: string;
}

interface Options {
  readonly onStdErr?: undefined | ((data: string) => void);
  readonly onStdOut?: undefined | ((data: string) => void);
}

const ERROR_STATUS_CODE = 1;
const SUCCESS_STATUS_CODE = 0;

export default function execute(
  command: string,
  args: readonly string[],
  { onStdErr, onStdOut }: Options = {},
): Promise<ExecutionResult> {
  return new Promise<ExecutionResult>((resolve): void => {
    const childProcess: ChildProcess = execFile(
      command,
      args,
      { cwd: process.cwd(), encoding: 'utf-8', shell: false },
      (err: ExecFileException | null, stdout: string, stderr: string): void => {
        const { exitCode } = childProcess;

        if (err === null) {
          resolve({
            exitCode: exitCode ?? SUCCESS_STATUS_CODE,
            stderr,
            stdout,
          });
          return;
        }

        if (stderr === '') {
          resolve({
            exitCode: exitCode ?? ERROR_STATUS_CODE,
            stderr: err.message,
            stdout,
          });
        }

        resolve({
          exitCode: exitCode ?? ERROR_STATUS_CODE,
          stderr: `${stderr}${EOL}${err.message}`,
          stdout,
        });
      },
    );

    if (typeof onStdOut !== 'undefined' && childProcess.stdout !== null) {
      childProcess.stdout.on('data', (chunk: unknown): void => {
        if (!hasToStringMethod(chunk)) {
          return;
        }

        const str: unknown = chunk.toString();
        if (typeof str !== 'string') {
          return;
        }
        onStdOut(str);
      });
    }

    if (typeof onStdErr !== 'undefined' && childProcess.stderr !== null) {
      childProcess.stderr.on('data', (chunk: unknown) => {
        if (!hasToStringMethod(chunk)) {
          return;
        }

        const str: unknown = chunk.toString();
        if (typeof str !== 'string') {
          return;
        }
        onStdErr(str);
      });
    }
  });
}
