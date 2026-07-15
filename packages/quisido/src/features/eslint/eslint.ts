import { ESLint } from 'eslint';
import { join, resolve } from 'node:path';
import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import toString from '../../utils/to-string.js';
import randomInt from '../../utils/random-int.js';
import withDuration from '../../utils/with-duration.js';
import getDisposableTempDir from '../../utils/get-disposable-temp-dir.js';
import npx from '../npx/npx.js';
import writeTemporaryFile from '../../utils/write-temporary-file.js';
import type { CompilerOptions } from 'typescript';
// import { cpus } from 'node:os';

const MAX_CONCURRENCY = 1; // : number = cpus().length;
const MIN_CONCURRENCY = 1;

export const eslint: ReportingTool = new ReportingTool(
  'eslint',
  async (): Promise<ReportingToolResult> => {
    const cwd: string = process.cwd();
    const outDir: string = join(await getDisposableTempDir(), 'eslint-config');
    const project: string = await writeTemporaryFile('tsconfig.eslint-config.json', JSON.stringify({
      compilerOptions: {
        declarationDir: outDir,
        noEmit: false,
        outDir,
        skipLibCheck: true,
      } satisfies CompilerOptions,
      extends: resolve(cwd, 'tsconfig.json'),
      include: [resolve(cwd, 'eslint.config.ts')],
    }));

    const { exitCode, stderr } = await npx(
      'tsc',
      '--project',
      project,
    );

    if (exitCode === 1) {
      throw new Error(`Failed to transpile ESLint configuration: ${stderr}`);
    }

    const concurrency: number = randomInt(MIN_CONCURRENCY, MAX_CONCURRENCY);
    const linter: ESLint = new ESLint({
      cache: true,
      cacheLocation: '.cache/eslint.json',
      concurrency: concurrency === 1 ? 'off' : concurrency,
      cwd,
      overrideConfigFile: resolve(outDir, 'eslint.config.js'),
      stats: true,
    });

    const { duration: resultsDuration, error: resultsError } =
      await withDuration(async (): Promise<void> => {
        await linter.lintFiles('.');
      });

    eslint.logInfo(
      `Linted in ${resultsDuration} seconds (${concurrency} threads)`,
    );

    if (resultsError !== null) {
      return {
        context:
          "ESLint encountered an error while analyzing this package's contents.",
        message: toString(resultsError),
        path: '.tests/eslint.json',
        status: 'failure',
      };
    }

    return {
      path: '.tests/eslint.json',
      status: 'success',
    };
  },
);
