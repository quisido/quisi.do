import type Report from '../../types/report.js';
import mapToString from '../../utils/map-to-string.js';
import ReportingTool from '../../utils/reporting-tool.js';
import testVsCodeSettings from './test-vscode-settings.js';

export const quisidoTest: ReportingTool = new ReportingTool(
  'quisido:test',
  async (): Promise<Omit<Report, 'tool'>> => {
    try {
      await testVsCodeSettings();
      return {
        status: 'success',
      };
    } catch (err: unknown) {
      return {
        message: mapToString(err),
        status: 'failure',
      };
    }
  },
);
