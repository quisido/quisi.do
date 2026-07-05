import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import npx from '../npx/npx.js';

export const knip: ReportingTool = new ReportingTool(
  'knip',
  async (): Promise<ReportingToolResult> => {
    const { exitCode, stdout } = await npx('knip');

    if (exitCode === 0) {
      return {
        status: 'success',
      };
    }

    return {
      context:
        'The Knip tool found unused files, dependencies, or exports in this ' +
        'package.',
      message: stdout,
      status: 'failure',
    };
  },
);
