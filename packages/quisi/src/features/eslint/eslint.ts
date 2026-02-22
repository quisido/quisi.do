import type Report from '../../types/report.js';
import ReportingTool from '../../utils/reporting-tool.js';
import debug from '../../utils/debug.js';
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
    debug('[eslint] ⏳');
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

    if (resultsError === null) {
      debug(
        `[eslint] ✔️  (${resultsDuration} seconds, ${concurrency} threads)`,
      );
    } else {
      debug(
        `[eslint] ❌  (${resultsDuration} seconds, ${concurrency} threads)`,
      );
    }

    const {
      duration: reportsDuration,
      error: reportsError,
      result: reportPath,
    } = await withDuration(async (): Promise<string> => {
      await report({ format: 'html' });
      return await report({ format: 'json' });
    });

    debug(`[eslint] Generated reports in ${reportsDuration} seconds.`);

    if (resultsError !== null) {
      /**
       *   Technical debt: If there was an error generating the reports, we
       * should notify the user here somehow.
       */
      return {
        context:
          "ESLint encountered an error while analyzing this package's contents.",
        message: mapToString(resultsError),
        path: reportPath ?? undefined,
        status: 'failure',
      };
    }

    if (reportsError !== null) {
      return {
        context: 'ESLint encountered an error while generating its report.',
        message: mapToString(reportsError),
        /**
         *   Technically, ESLint was still successful, because `resultsError` is
         * null; but we want to address whatever is causing the reports to fail.
         */
        status: 'failure',
      };
    }

    return {
      path: reportPath ?? undefined,
      status: 'success',
    };
  },
);
