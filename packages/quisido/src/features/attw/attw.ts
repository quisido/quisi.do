import type Report from '../../types/report.js';
import ReportingTool from '../../utils/reporting-tool.js';
import getPackageJson from '../../utils/get-package-json.js';
import requireResolve from '../../utils/require-resolve.js';
import writeTestsFile from '../../utils/write-tests-file.js';
import npx from '../npx/npx.js';

const CONFIG_PATH: string = requireResolve('quisido/.attw.json');

export const attw: ReportingTool = new ReportingTool(
  'attw',
  async (): Promise<Omit<Report, 'tool'>> => {
    const { private: isPrivate } = await getPackageJson();
    if (isPrivate === true) {
      return {
        message: 'The package is private.',
        status: 'skipped',
      };
    }

    const { exitCode, stdout: json } = await npx(
      'attw',
      '--config-path',
      CONFIG_PATH,
      '--format',
      'json',
    );

    const testsPath: string = await writeTestsFile('attw.json', json);

    if (exitCode === 0) {
      return {
        path: testsPath,
        status: 'success',
      };
    }

    const { stdout: tableFlipped } = await npx(
      'attw',
      '--config-path',
      CONFIG_PATH,
      '--format',
      'table-flipped',
    );

    return {
      context:
        /**
         *   Additionally, the rule "cjs-resolves-to-esm" ("Entrypoint is
         * ESM-only") is ignored. Unless that context proves beneficial, it is
         * excluded here.
         */
        "`arethetypeswrong` CLI attempted to analyze this package's contents for issues with its TypeScript types, particularly ESM-related module resolution issues. It used Node16 module resolution.",
      message: tableFlipped,
      path: testsPath,
      status: 'failure',
    };
  },
);
