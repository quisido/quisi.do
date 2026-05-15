import createTSConfigFile from './create-tsconfig-file.js';
import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import npx from '../npx/npx.js';

interface Options {
  readonly args?: readonly string[] | undefined;
  readonly id: string;
  readonly onStdErr?: ((data: string) => void) | undefined;
  readonly onStdOut?: ((data: string) => void) | undefined;
}

export const tsc: ReportingTool<[Options]> = new ReportingTool<[Options]>(
  'tsc',
  async ({
    args = [],
    id,
    onStdErr,
    onStdOut,
  }: Options): Promise<ReportingToolResult> => {
    /**
     * If this fails because `@types/node` mismatches, then a package has an
     * outdated version in `node_modules/`. `npm install @types/node@latest`
     * does not seem to fix it; you can delete `node_modules/` and remove
     * references to "packages/__/node_modules/@types/node" in
     * `package-lock.json`. You can find these references by Ctrl-F for
     * "/@types/node" with the `/` prefix.
     */
    const tsconfigFile: string = await createTSConfigFile({ id });
    const { exitCode, stdout } = await npx(
      { onStdErr, onStdOut },
      'tsc',
      '--project',
      tsconfigFile,
      ...args,
    );
    if (exitCode === 0) {
      return {
        status: 'success',
      };
    }

    return {
      context:
        'The TypeScript compiler threw an error while transpiling this ' +
        'package.',
      message: stdout,
      status: 'failure',
    };
  },
);
