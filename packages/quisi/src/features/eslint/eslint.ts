import debug from '../../utils/debug.js';
import mapToError from '../../utils/map-to-error.js';
import withDuration from '../../utils/with-duration.js';
import npxEslint from './npx-eslint.js';
import report from './report.js';

interface Options {
  readonly concurrency: number;
  readonly eslintConfigFile?: string | undefined;
}

export default async function eslint({
  concurrency,
  eslintConfigFile = 'eslint.config.ts',
}: Options): Promise<void> {
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
  debug(`ESLint results took ${resultsDuration}s with ${concurrency} threads.`);

  if (resultsError !== null) {
    throw mapToError(resultsError);
  }

  const { duration: reportsDuration, error: reportsError } = await withDuration(
    async (): Promise<void> => {
      await report({ eslintConfigFile, format: 'html' });
      await report({ eslintConfigFile, format: 'json' });
    },
  );
  debug(`ESLint reports took ${reportsDuration}s.`);

  if (reportsError !== null) {
    throw mapToError(reportsError);
  }
}
