#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { attw } from './features/attw/attw.js';
import { eslint } from './features/eslint/eslint.js';
import { publint } from './features/publint/publint.js';
import { quisidoTest } from './features/quisido-test/quisido-test.js';
import { tsc } from './features/tsc/tsc.js';
import type Report from './types/report.js';
import { handleExit } from './utils/exit.js';
import handleReadReportFileError from './utils/handle-read-report-file-error.js';
import handleReadReportFile from './utils/handle-read-report-file.js';
import { vitest } from './features/vitest/vitest.js';

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
    eventualReports.push(
      tsc.run({
        id: 'build',
      }),
    );
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
    eventualReports.push(
      tsc.run({
        args: ['--watch'],
        id: 'start',
      }),
    );
    break;
  }

  case 'test': {
    eventualReports.push(attw.run());
    eventualReports.push(eslint.run());
    eventualReports.push(publint.run());
    eventualReports.push(quisidoTest.run());
    eventualReports.push(vitest.run());
    break;
  }

  case 'vitest': {
    globalThis.console.warn('Vitest is not yet supported.');
    process.exitCode = 1;
    break;
  }

  default: {
    globalThis.console.error(`Unknown command: ${command}`);
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
⚠️  ${tool} ⚠️
--------------------------------------------------------------------------------
${context ?? ''}

## Error message

\`\`\`
${message ?? ''}
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
