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
      const {
        dependencies,
        devDependencies,
        private: isPrivate,
      } = await getPackageJson();

      // dependencies
      if (
        dependencies !== undefined &&
        (typeof dependencies !== 'object' || dependencies === null)
      ) {
        throw new Error('Expected `dependencies` to be an object.');
      }

      // devDependencies
      if (
        devDependencies !== undefined &&
        (typeof devDependencies !== 'object' || devDependencies === null)
      ) {
        throw new Error('Expected `devDependencies` to be an object.');
      }

      const type: PackageType = isPrivate === true ? 'application' : 'library';
      const jsx: boolean = new Set(
        Object.keys({
          ...dependencies,
          ...devDependencies,
        }),
      ).has('react');

      await Promise.all([
        testTSBuildConfig({ jsx, type }),
        testTSConfig({ jsx, type }),
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
