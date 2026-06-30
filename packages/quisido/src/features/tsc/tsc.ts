import createTSConfigFile from './create-tsconfig-file.js';
import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import npx from '../npx/npx.js';
import process from 'node:process';
import { join } from 'node:path';
import parseJsonFile from '../../utils/parse-json-file.js';

interface Options {
  readonly build?: boolean | undefined;
  readonly id: string;
  readonly onStdErr?: ((data: string) => void) | undefined;
  readonly onStdOut?: ((data: string) => void) | undefined;
  readonly watch?: boolean | undefined;
}

export const tsc: ReportingTool<[Options]> = new ReportingTool<[Options]>(
  'tsc',
  async ({
    build = false,
    id,
    onStdErr,
    onStdOut,
    watch,
  }: Options): Promise<ReportingToolResult> => {
    const cwd: string = process.cwd();

    /**
     * If this fails because `@types/node` mismatches, then a package has an
     * outdated version in `node_modules/`. `npm install @types/node@latest`
     * does not seem to fix it; you can delete `node_modules/` and remove
     * references to "packages/__/node_modules/@types/node" in
     * `package-lock.json`. You can find these references by Ctrl-F for
     * "/@types/node" with the `/` prefix.
     */
    const tsconfigFile: string = await createTSConfigFile({
      extends: join(cwd, 'tsconfig.json'),
      id,
    });

    const args: string[] = [build ? '--build' : '--project', tsconfigFile];
    if (watch) {
      args.push('--watch');
    }

    const { exitCode, stdout } = await npx(
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
    const tsConfig: Record<string, unknown> = await parseJsonFile(tsconfigFile);
    return {
      context:
        'The TypeScript compiler threw an error while transpiling.\n\n' +
        `**Working directory:** ${cwd}\n` +
        `**Command:** ${cmd}\n` +
        '<TypeScript-configuration>\n' +
        JSON.stringify(tsConfig, null, 2) + '\n' +
        '</TypeScript-configuration>',
      message: stdout,
      status: 'failure',
    };
  },
);
