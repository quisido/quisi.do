#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { attw } from './features/attw/attw.js';
import build from './features/build/build.js';
import { eslint } from './features/eslint/eslint.js';
import { publint } from './features/publint/publint.js';
import { quisiTest } from './features/quisi-test/quisi-test.js';
import start from './features/start/start.js';
import type Report from './types/report.js';
import { handleExit } from './utils/exit.js';
import handleReadReportFileError from './utils/handle-read-report-file-error.js';
import handleReadReportFile from './utils/handle-read-report-file.js';

const [, , command] = process.argv;

process.on('beforeExit', (): void => {
  void handleExit();
});

const eventualReports: Promise<Report>[] = [];

switch (command) {
  case 'attw': {
    eventualReports.push(attw.run());
    break;
  }

  case 'build': {
    await build();
    break;
  }

  case 'eslint': {
    eventualReports.push(eslint.run());
    break;
  }

  case 'publint': {
    eventualReports.push(publint.run());
    break;
  }

  case 'start': {
    await start();
    break;
  }

  case 'test': {
    eventualReports.push(attw.run());
    eventualReports.push(eslint.run());
    eventualReports.push(publint.run());
    eventualReports.push(quisiTest.run());
    break;
  }

  case 'vitest': {
    globalThis.console.warn('Vitest is not yet supported.');
    process.exitCode = 1;
    break;
  }
}

const settledReports: PromiseSettledResult<Report>[] =
  await Promise.allSettled(eventualReports);

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

for (const settledReport of settledReports) {
  switch (settledReport.status) {
    case 'fulfilled': {
      const {
        value: { context, message, path, status, tool },
      } = settledReport;
      switch (status) {
        case 'failure': {
          // eslint-disable-next-line no-await-in-loop
          const report: string | undefined = await mapReportPathToContext(path);
          globalThis.console.error(
            `
--------------------------------------------------------------------------------
⚠️ ${tool} ⚠️
--------------------------------------------------------------------------------
${context}

## Error message

\`\`\`
${message}
\`\`\`

${report ?? ''}
`.trim(),
          );
          process.exitCode = 1;
          break;
        }

        case 'skipped':
        case 'success': {
          break;
        }
      }
      break;
    }

    /**
     *   Since each ReportingTool is wrapped in a try/catch to return a `Report`
     * with `status: 'failure'`, this case should not be possible.
     */
    case 'rejected': {
      globalThis.console.error(settledReport.reason);
      process.exitCode = 1;
      break;
    }
  }
}
