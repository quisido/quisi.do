import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import npx from '../npx/npx.js';

export const vitest: ReportingTool = new ReportingTool(
  'vitest',
  async (): Promise<ReportingToolResult> => {
    const { exitCode, stderr } = await npx('vitest', 'run');
    if (exitCode === 0) {
      return {
        status: 'success',
      };
    }

    return {
      context: 'Vitest threw an error while testing this package.',
      message: stderr,
      status: 'failure',
    };
  },
);
