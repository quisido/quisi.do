import { readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import npx from '../npx/npx.js';
import type { ExecutionResult } from '../../utils/execute.js';
import hasPackageFile from '../../utils/has-package-file.js';
import ReportingTool, {
  type ReportingToolResult,
} from '../../utils/reporting-tool.js';
import toString from '../../utils/to-string.js';
import writeTestsFile from '../../utils/write-tests-file.js';

export type MarkdownlintRunner = (
  ...args: readonly string[]
) => Promise<ExecutionResult>;

interface Options {
  readonly args?: readonly string[] | undefined;
  readonly outputPath?: string | undefined;
  readonly outputReader?: ((path: string) => Promise<string>) | undefined;
  readonly runner: MarkdownlintRunner;
}

const CONFIG_FILES: readonly string[] = [
  '.markdownlint.json',
  '.markdownlint.jsonc',
  '.markdownlint.yaml',
  '.markdownlint.yml',
  '.markdownlintrc',
  '.markdownlintrc.json',
  '.markdownlintrc.jsonc',
  '.markdownlintrc.yaml',
  '.markdownlintrc.yml',
];
const DEFAULT_DISABLED_RULES: readonly string[] = [
  'MD013',
  'MD033',
  'MD041',
  'MD060',
];
const FAILURE_CONTEXT: string =
  'Markdownlint encountered an error while analyzing this package for ' +
  'Markdown style and formatting issues.';

export const MARKDOWNLINT_ARGS: readonly string[] = [
  'markdownlint',
  '**/*.md',
  '--dot',
  '--ignore',
  '**/.agents',
  '--ignore',
  '**/.agents/**/*',
  '--ignore',
  '**/.cache/**',
  '--ignore',
  '**/.tests/**',
  '--ignore',
  '**/dist/**',
  '--ignore',
  '**/node_modules/**',
];

const readMarkdownlintOutput = async (path: string): Promise<string> =>
  await readFile(path, 'utf8');

const hasLocalConfig = async (): Promise<boolean> => {
  const results: readonly boolean[] = await Promise.all(
    CONFIG_FILES.map(hasPackageFile),
  );
  return results.includes(true);
};

const mapOutputPathToArgs = (
  args: readonly string[],
  outputPath: string | undefined,
): readonly string[] => {
  if (outputPath === undefined) {
    return args;
  }
  return [...args, '--output', outputPath];
};

const mapMessageToFailureMessage = (
  message: string,
  exitCode: number,
): string => {
  if (message === '') {
    return `Markdownlint failed with exit code ${exitCode}.`;
  }
  return message;
};

const readOutput = async (
  outputPath: string | undefined,
  outputReader: (path: string) => Promise<string>,
): Promise<string> => {
  let output = '';
  if (outputPath !== undefined) {
    try {
      output = await outputReader(outputPath);
    } catch (err: unknown) {
      output = `Unable to read markdownlint output at "${outputPath}": ${toString(err)}`;
    }
  }
  return output;
};

export const runMarkdownlint = async ({
  args: baseArgs = MARKDOWNLINT_ARGS,
  outputPath,
  outputReader = readMarkdownlintOutput,
  runner,
}: Options): Promise<ReportingToolResult> => {
  const args: readonly string[] = mapOutputPathToArgs(baseArgs, outputPath);
  const { exitCode, stderr, stdout } = await runner(...args);

  if (exitCode === 0) {
    return {
      path: outputPath,
      status: 'success',
    };
  }

  const output: string = await readOutput(outputPath, outputReader);
  const message: string = [stdout, stderr, output].join(EOL).trim();

  return {
    context: FAILURE_CONTEXT,
    message: mapMessageToFailureMessage(message, exitCode),
    path: outputPath,
    status: 'failure',
  };
};

export const markdownlint: ReportingTool = new ReportingTool(
  'markdownlint',
  async (): Promise<ReportingToolResult> => {
    const outputPath: string = await writeTestsFile('markdownlint.txt', '');
    let args: readonly string[] = MARKDOWNLINT_ARGS;
    if (!(await hasLocalConfig())) {
      args = [...MARKDOWNLINT_ARGS, '--disable', ...DEFAULT_DISABLED_RULES];
    }
    return await runMarkdownlint({
      args,
      outputPath,
      runner: npx,
    });
  },
);
