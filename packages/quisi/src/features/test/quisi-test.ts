import testAiExclude from './test-aiexclude.js';
import testVsCodeSettings from './test-vscode-settings.js';

export default async function quisiTest(): Promise<void> {
  await testAiExclude();
  await testVsCodeSettings();
}
