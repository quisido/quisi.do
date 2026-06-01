import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import toString from '../../utils/to-string.js';
import randomInt from '../../utils/random-int.js';
import withDuration from '../../utils/with-duration.js';
import npxEslint from './npx-eslint.js';
import report from './report.js';
import { cpus } from 'node:os';

const MAX_CONCURRENCY: number = cpus().length;
const MIN_CONCURRENCY = 1;

export const eslint: ReportingTool = new ReportingTool(
  'eslint',
  async (): Promise<ReportingToolResult> => {
    const concurrency: number = randomInt(MIN_CONCURRENCY, MAX_CONCURRENCY);

    const { duration: resultsDuration, error: resultsError } =
      await withDuration(async (): Promise<void> => {
        await npxEslint(
          '--color',
          '--concurrency',
          concurrency.toString(),
          '--config',
          'eslint.config.ts',
        );
      });

    eslint.logInfo(
      `Linted in ${resultsDuration} seconds (${concurrency} threads)`,
    );

    const {
      duration: reportsDuration,
      error: reportsError,
      result: reportPath,
    } = await withDuration(async (): Promise<string> => {
      await report({ format: 'html' });
      return await report({ format: 'json' });
    });

    eslint.logInfo(`Generated reports in ${reportsDuration} seconds`);

    if (reportsError !== null) {
      const reportsMessage: string = toString(reportsError);
      if (resultsError !== null) {
        const resultsMessage: string = toString(resultsError);

        return {
          context:
            "ESLint encountered an error while analyzing this package's " +
            'contents and again while generating its report.',
          message: [resultsMessage, reportsMessage].join('\n\n'),
          status: 'failure',
        };
      }

      return {
        context: 'ESLint encountered an error while generating its report.',
        message: reportsMessage,
        status: 'failure',
      };
    }

    if (resultsError !== null) {
      return {
        context:
          "ESLint encountered an error while analyzing this package's contents.",
        message: toString(resultsError),
        path: reportPath ?? undefined,
        status: 'failure',
      };
    }

    return {
      path: reportPath ?? undefined,
      status: 'success',
    };
  },
);
