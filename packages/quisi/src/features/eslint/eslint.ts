import debug from '../../utils/debug.js';
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
  const [resultsDuration] = await withDuration(async (): Promise<void> => {
    await npxEslint(
      '--color',
      '--concurrency',
      concurrency.toString(),
      '--config',
      eslintConfigFile,
    );
  });
  debug(`ESLint results took ${resultsDuration}s with ${concurrency} threads.`);

  const [reportsDuration] = await withDuration(async (): Promise<void> => {
    await report({ eslintConfigFile, format: 'html' });
    await report({ eslintConfigFile, format: 'json' });
  });
  debug(`ESLint reports took ${reportsDuration}s.`);
}
