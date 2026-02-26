import type Report from '../../types/report.js';
import ReportingTool from '../../utils/reporting-tool.js';
import npx from '../npx/npx.js';

export const publint: ReportingTool = new ReportingTool(
  'publint',
  async (): Promise<Omit<Report, 'tool'>> => {
    const { exitCode, stdout } = await npx('publint', '--strict');

    if (exitCode === 0) {
      return {
        status: 'success',
      };
    }

    return {
      context:
        'The Publint tool threw an error while analyzing this package for ' +
        'best practices,configuration mistakes, and environment ' +
        'compatibility (Node, Rollup, Vite, Webpack, etc.).',
      message: stdout,
      status: 'failure',
    };
  },
);
