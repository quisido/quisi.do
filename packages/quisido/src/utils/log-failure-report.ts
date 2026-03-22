import { type FailureReport } from '../types/report.js';

/*
Feed this to AI to provide additional context.
const mapReportPathToContext = async (
  path: string | undefined,
): Promise<string | undefined> => {
  if (path === undefined) {
    return;
  }

  return await readFile(path, 'utf8')
    .then(handleReadReportFile)
    .catch(handleReadReportFileError);
};
*/

export default function logFailureReport({
  context,
  message,
  tool,
}: Omit<FailureReport, 'status'>): void {
  globalThis.console.error(`
--------------------------------------------------------------------------------
⚠️ ${tool} ⚠️
--------------------------------------------------------------------------------

${context}

${message}
`);
}
