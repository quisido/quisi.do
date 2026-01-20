import mapStringToLines from '../../utils/map-string-to-lines.js';
import readPackageFile from '../../utils/read-package-file.js';

export default async function testAiExclude(): Promise<void> {
  const aiExclude: string | null = await readPackageFile('.aiexclude');
  if (aiExclude === null) {
    throw new Error('Expected package to contain an .aiexclude file.');
  }

  const gitIgnore: string | null = await readPackageFile('.gitignore');
  if (gitIgnore === null) {
    throw new Error('Expected package to contain an .gitignore file.');
  }

  const aiExcludeLines = new Set<string>(mapStringToLines(aiExclude));
  const gitIgnoreLines: readonly string[] = mapStringToLines(gitIgnore);
  for (const gitIgnoreLine of gitIgnoreLines) {
    if (aiExcludeLines.has(gitIgnoreLine)) {
      continue;
    }

    throw new Error(
      `Expected .aiexclude to contain "${gitIgnoreLine}" to match .gitignore.`,
    );
  }
}
