#!/usr/bin/env node
import { attw } from './features/attw/attw.js';
import { eslint } from './features/eslint/eslint.js';
import { markdownlint } from './features/markdownlint/markdownlint.js';
import { publint } from './features/publint/publint.js';
import { quisidoTest } from './features/quisido-test/quisido-test.js';
import { tsc } from './features/tsc/tsc.js';
import { type Report } from './types/report.js';
import { handleExit } from './utils/exit.js';
import { vitest } from './features/vitest/vitest.js';
import writeTestsFile from './utils/write-tests-file.js';
import logFailureReport from './utils/log-failure-report.js';

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

  case 'markdownlint': {
    eventualReports.push(markdownlint.run());
    break;
  }

  case 'publint': {
    eventualReports.push(publint.run());
    break;
  }

  case 'start': {
    void tsc.run({
      args: ['--watch'],
      id: 'start',
      onStdErr(data: string): void {
        globalThis.console.error(data);
      },
      onStdOut(data: string): void {
        globalThis.console.log(data);
      },
    });
    break;
  }

  case 'test': {
    eventualReports.push(attw.run());
    eventualReports.push(eslint.run());
    eventualReports.push(markdownlint.run());
    eventualReports.push(publint.run());
    eventualReports.push(quisidoTest.run());
    eventualReports.push(vitest.run());
    break;
  }

  case 'vitest': {
    eventualReports.push(vitest.run());
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

if (settledReports.length > 0) {
  await writeTestsFile(
    `quisido.${command}.json`,
    JSON.stringify(settledReports),
  );
}

for (const settledReport of settledReports) {
  switch (settledReport.status) {
    case 'fulfilled': {
      const { value: report } = settledReport;
      switch (report.status) {
        case 'failure': {
          logFailureReport(report);
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
     * Since each ReportingTool is wrapped in a try/catch to return a `Report`
     * with `status: 'failure'`, this case should not be possible.
     */
    case 'rejected': {
      globalThis.console.error(
        '[quisido] Unexpected settled report error:',
        settledReport.reason,
      );
      process.exitCode = 1;
      break;
    }
  }
}
