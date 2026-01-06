import debug from '../../utils/debug.js';
import mapToError from '../../utils/map-to-error.js';
import randomInt from '../../utils/random-int.js';
import withDuration from '../../utils/with-duration.js';
import npxEslint from './npx-eslint.js';
import report from './report.js';

interface Options {
  readonly eslintConfigFile?: string | undefined;
}

const MAX_CONCURRENCY = 4;
const MIN_CONCURRENCY = 1;

export default async function eslint({
  eslintConfigFile = 'eslint.config.ts',
}: Options): Promise<void> {
  debug('[eslint] ⏳');
  const concurrency: number = randomInt(MIN_CONCURRENCY, MAX_CONCURRENCY);

  const { duration: resultsDuration, error: resultsError } = await withDuration(
    async (): Promise<void> => {
      await npxEslint(
        '--color',
        '--concurrency',
        concurrency.toString(),
        '--config',
        eslintConfigFile,
      );
    },
  );

  if (resultsError !== null) {
    debug(`[eslint] ❌  (${resultsDuration} seconds, ${concurrency} threads)`);
    throw mapToError(resultsError);
  }

  debug(`[eslint] ✔️  (${resultsDuration} seconds, ${concurrency} threads)`);
  const { duration: reportsDuration, error: reportsError } = await withDuration(
    async (): Promise<void> => {
      await report({ eslintConfigFile, format: 'html' });
      await report({ eslintConfigFile, format: 'json' });
    },
  );

  debug(`[eslint] Generated reports in ${reportsDuration} seconds.`);
  if (reportsError !== null) {
    throw mapToError(reportsError);
  }
}
