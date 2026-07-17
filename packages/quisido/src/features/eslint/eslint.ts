import { ESLint, type Linter } from 'eslint';
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
import type { CompilerOptions } from 'typescript/unstable/proto';
// import { cpus } from 'node:os';

const MAX_CONCURRENCY = 1; // : number = cpus().length;
const MIN_CONCURRENCY = 1;

const isDefined = <T>(value: T | undefined): value is T =>
  typeof value !== 'undefined';

const isErrorResult = ({
  errorCount,
  fatalErrorCount,
}: ESLint.LintResult): boolean => errorCount > 0 || fatalErrorCount > 0;

const toMessage = ({ filePath, messages }: ESLint.LintResult): string => {
  const toString = ({
    column,
    endColumn,
    endLine,
    line,
    message,
    ruleId,
  }: Linter.LintMessage): string => {
    const columns: string = [column, endColumn].filter(isDefined).join('-');
    const lines: string = [line, endLine].filter(isDefined).join('-');
    return `:${lines}:${columns} [${ruleId}] ${message}`;
  };

  return `${filePath}:\n${messages.map(toString).join('\n')}`;
};

export const eslint: ReportingTool = new ReportingTool(
  'eslint',
  async (): Promise<ReportingToolResult> => {
    const cwd: string = process.cwd();
    const outDir: string = join(await getDisposableTempDir(), 'eslint-config');
    const project: string = await writeTemporaryFile(
      'tsconfig.eslint-config.json',
      JSON.stringify({
        compilerOptions: {
          declarationDir: outDir,
          noEmit: false,
          outDir,
          skipLibCheck: true,
        } satisfies CompilerOptions,
        extends: resolve(cwd, 'tsconfig.json'),
        include: [resolve(cwd, 'eslint.config.ts')],
      }),
    );

    const { exitCode, stderr } = await npx('tsc', '--project', project);

    if (exitCode !== 0) {
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
        const results: readonly ESLint.LintResult[] =
          await linter.lintFiles('.');
        const errors: readonly ESLint.LintResult[] =
          results.filter(isErrorResult);
        if (errors.length > 0) {
          throw new Error(errors.map(toMessage).join('\n'), { cause: results });
        }
      });

    eslint.logInfo(
      `Linted in ${resultsDuration} seconds (${concurrency} threads)`,
    );

    if (resultsError !== null) {
      return {
        context:
          "ESLint encountered an error while analyzing this package's contents.",
        message: toString(resultsError),
        status: 'failure',
      };
    }

    return {
      status: 'success',
    };
  },
);
