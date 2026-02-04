import debug from '../../utils/debug.js';
import testAiExclude from './test-aiexclude.js';
import testVsCodeSettings from './test-vscode-settings.js';

export default async function quisiTest(): Promise<void> {
  debug('[quisi] ⏳');
  try {
    await testAiExclude();
    await testVsCodeSettings();
    debug('[quisi] ✔️');
  } catch (err: unknown) {
    debug('[quisi] ❌');
    throw err;
  }
}
