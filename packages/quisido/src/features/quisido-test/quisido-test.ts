import toString from '../../utils/to-string.js';
import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import testTSBuildConfig from './test-ts-build-config.js';
import testTSConfig from './test-tsconfig.js';
import testVsCodeSettings from './test-vscode-settings.js';
import getPackageJson from '../../utils/get-package-json.js';
import type { PackageType } from '../../utils/package-type.js';

export const quisidoTest: ReportingTool = new ReportingTool(
  'quisido:test',
  async (): Promise<ReportingToolResult> => {
    try {
      const { private: isPrivate } = await getPackageJson();
      const type: PackageType = isPrivate === true ? 'application' : 'library';
      await Promise.all([
        testTSBuildConfig({ type }),
        testTSConfig({ type }),
        testVsCodeSettings(),
      ]);
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
