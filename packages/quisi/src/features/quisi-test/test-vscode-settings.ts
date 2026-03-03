import parseJson from '../../utils/parse-json.js';
import readPackageFile from '../../utils/read-package-file.js';
import testFilesWatcherExclude from './test-vscode-settings/test-files-watcher-exclude.js';
import testSearchExclude from './test-vscode-settings/test-search-exclude.js';

export default async function testVsCodeSettings(): Promise<void> {
  const vsCodeSettings = await readPackageFile('.vscode/settings.json');

  if (vsCodeSettings === null) {
    throw new Error(
      'Expected package to contain a .vscode/settings.json file.',
    );
  }

  const settings: unknown = parseJson(vsCodeSettings);
  if (typeof settings !== 'object' || settings === null) {
    throw new Error('Expected .vscode/settings.json to contain JSON.');
  }

  await testFilesWatcherExclude(settings);
  await testSearchExclude(settings);
}
