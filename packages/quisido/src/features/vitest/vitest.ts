import type Report from '../../types/report.js';
import ReportingTool from '../../utils/reporting-tool.js';
import npx from '../npx/npx.js';

export const vitest: ReportingTool = new ReportingTool(
  'vitest',
  async (): Promise<Omit<Report, 'tool'>> => {
    const { exitCode, stdout } = await npx('vitest', 'run');
    if (exitCode === 0) {
      return {
        status: 'success',
      };
    }

    return {
      context: 'Vitest threw an error while testing this package.',
      message: stdout,
      status: 'failure',
    };
  },
);
