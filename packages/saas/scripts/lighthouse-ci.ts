import { spawnSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { stderr } from 'node:process';

const MAX_ATTEMPTS = 3;
const REPORT_PATHS = ['lighthouse.report.html', 'lighthouse.report.json'];

// A downloaded build or previous local run must not count as this run's report.
for (const reportPath of REPORT_PATHS) {
  rmSync(reportPath, { force: true });
}

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
  const { error, signal, status } = spawnSync(
    'bash',
    ['./scripts/lighthouse-serve.sh'],
    { stdio: 'inherit' },
  );

  if (error !== undefined) {
    throw new Error(`Unable to launch Lighthouse on attempt ${attempt}.`, {
      cause: error,
    });
  }

  if (signal !== null) {
    throw new Error(
      `Lighthouse terminated by ${signal} on attempt ${attempt}.`,
    );
  }

  if (status === 0) {
    if (!REPORT_PATHS.every(reportPath => existsSync(reportPath))) {
      throw new Error('Lighthouse exited successfully without both reports.');
    }
    break;
  }

  if (
    REPORT_PATHS.some(reportPath => existsSync(reportPath)) ||
    attempt === MAX_ATTEMPTS
  ) {
    throw new Error(
      `Lighthouse failed with exit code ${status} on attempt ${attempt}.`,
    );
  }

  stderr.write(
    `warning: Lighthouse failed with exit code ${status} before writing reports on attempt ${attempt}; retrying.\n`,
  );
}
