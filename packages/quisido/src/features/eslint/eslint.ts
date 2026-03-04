import type Report from '../../types/report.js';
import ReportingTool from '../../utils/reporting-tool.js';
import mapToString from '../../utils/map-to-string.js';
import randomInt from '../../utils/random-int.js';
import withDuration from '../../utils/with-duration.js';
import npxEslint from './npx-eslint.js';
import report from './report.js';

const MAX_CONCURRENCY = 4;
const MIN_CONCURRENCY = 1;

export const eslint: ReportingTool = new ReportingTool(
  'eslint',
  async (): Promise<Omit<Report, 'tool'>> => {
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
      const reportsMessage: string = mapToString(reportsError);
      if (resultsError !== null) {
        const resultsMessage: string = mapToString(resultsError);

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
        message: mapToString(resultsError),
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
