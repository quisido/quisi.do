import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import npx from '../npx/npx.js';
import process from 'node:process';
import { join } from 'node:path';

interface Options {
  readonly build?: boolean | undefined;
  readonly onStdErr?: ((data: string) => void) | undefined;
  readonly onStdOut?: ((data: string) => void) | undefined;
  readonly watch?: boolean | undefined;
}

/**
 * If this fails because `@types/node` mismatches, then a package has an
 * outdated version in `node_modules/`. `npm install @types/node@latest`
 * does not seem to fix it; you can delete `node_modules/` and remove
 * references to "packages/__/node_modules/@types/node" in
 * `package-lock.json`. You can find these references by Ctrl-F for
 * "/@types/node" with the `/` prefix.
 */
export const tsc: ReportingTool<[Options]> = new ReportingTool<[Options]>(
  'tsc',
  async ({
    build = false,
    onStdErr,
    onStdOut,
    watch = false,
  }: Options): Promise<ReportingToolResult> => {
    const args: string[] = [];
    const cwd: string = process.cwd();

    if (build) {
      args.push(
        '--build',
        join(cwd, 'tsconfig.build.json'),
        '--generateCpuProfile',
        join(cwd, '.cache', 'tsc-output.build.cpuprofile'),
      );
    } else {
      args.push(
        '--generateCpuProfile',
        join(cwd, '.cache', 'tsc-output.cpuprofile'),
        '--project',
        join(cwd, 'tsconfig.json'),
      );
    }

    if (watch) {
      args.push('--watch');
    }

    const { exitCode, stderr, stdout } = await npx(
      { onStdErr, onStdOut },
      'tsc',
      ...args,
    );

    if (exitCode === 0) {
      return {
        status: 'success',
      };
    }

    const cmd: string = ['tsc', ...args].join(' ');
    return {
      context:
        `The TypeScript compiler threw an error while transpiling.\n\n` +
        `**Working directory:** ${cwd}\n` +
        `**Command:** ${cmd}\n`,
      message: [stdout, stderr].join('\n\n'),
      status: 'failure',
    };
  },
);
