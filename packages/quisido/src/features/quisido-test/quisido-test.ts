import toString from '../../utils/to-string.js';
import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import testVsCodeSettings from './test-vscode-settings.js';

export const quisidoTest: ReportingTool = new ReportingTool(
  'quisido:test',
  async (): Promise<ReportingToolResult> => {
    try {
      await testVsCodeSettings();
      return {
        status: 'success',
      };
    } catch (err: unknown) {
      return {
        context: 'The quisido built-in tests failed.',
        message: toString(err),
        status: 'failure',
      };
    }
  },
);
