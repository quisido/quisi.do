import type Report from '../../types/report.js';
import debug from '../../utils/debug.js';
import mapToString from '../../utils/map-to-string.js';
import ReportingTool from '../../utils/reporting-tool.js';
import testVsCodeSettings from './test-vscode-settings.js';

export const quisiTest: ReportingTool = new ReportingTool(
  'quisi',
  async (): Promise<Omit<Report, 'tool'>> => {
    debug('[quisi] ⏳');
    try {
      await testVsCodeSettings();
      debug('[quisi] ✔️');
      return {
        status: 'success',
      };
    } catch (err: unknown) {
      debug('[quisi] ❌');
      return {
        message: mapToString(err),
        status: 'failure',
      };
    }
  },
);
