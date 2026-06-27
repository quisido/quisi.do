import { access, constants, readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import { dirname, join, parse } from 'node:path';
import process from 'node:process';
import npx from '../npx/npx.js';
import type { ExecutionResult } from '../../utils/execute.js';
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
  readonly configPath?: string | undefined;
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
  '--ignore',
  'packages/**',
];

const readMarkdownlintOutput = async (path: string): Promise<string> =>
  await readFile(path, 'utf8');

const mapDirectoryToAncestors = (directory: string): readonly string[] => {
  const { root } = parse(directory);
  let currentDirectory: string = directory;
  const directories: string[] = [currentDirectory];

  while (currentDirectory !== root) {
    currentDirectory = dirname(currentDirectory);
    directories.push(currentDirectory);
  }

  return directories;
};

const mapPathToExistingPath = async (
  path: string,
): Promise<string | undefined> => {
  try {
    await access(path, constants.F_OK);
    return path;
  } catch (_err: unknown) {
    return undefined;
  }
};

const findConfigInDirectory = async (
  directory: string,
): Promise<string | undefined> => {
  const configPaths: readonly string[] = CONFIG_FILES.map(
    (configFile: string): string => join(directory, configFile),
  );
  const existingConfigPaths: readonly (string | undefined)[] =
    await Promise.all(configPaths.map(mapPathToExistingPath));

  return existingConfigPaths.find(
    (configPath: string | undefined): configPath is string =>
      configPath !== undefined,
  );
};

const findMarkdownlintConfig = async (
  directory: string = process.cwd(),
): Promise<string | undefined> => {
  const directories: readonly string[] = mapDirectoryToAncestors(directory);
  const configPaths: readonly (string | undefined)[] = await Promise.all(
    directories.map(findConfigInDirectory),
  );

  return configPaths.find(
    (configPath: string | undefined): configPath is string =>
      configPath !== undefined,
  );
};

const mapOptionsToArgs = (
  args: readonly string[],
  configPath: string | undefined,
  outputPath: string | undefined,
): readonly string[] => {
  if (configPath === undefined && outputPath === undefined) {
    return args;
  }

  const [command, ...remainingArgs] = args;
  const optionArgs: string[] = [];
  if (configPath !== undefined) {
    optionArgs.push('--config', configPath);
  }
  if (outputPath !== undefined) {
    optionArgs.push('--output', outputPath);
  }

  if (command === undefined) {
    return optionArgs;
  }
  return [command, ...optionArgs, ...remainingArgs];
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
  configPath,
  outputPath,
  outputReader = readMarkdownlintOutput,
  runner,
}: Options): Promise<ReportingToolResult> => {
  const args: readonly string[] = mapOptionsToArgs(
    baseArgs,
    configPath,
    outputPath,
  );
  const { exitCode, stderr, stdout } = await runner(...args);

  if (exitCode === 0) {
    return {
      status: 'success',
    };
  }

  const output: string = await readOutput(outputPath, outputReader);
  let messageParts: readonly string[] = [output];
  if (outputPath === undefined) {
    messageParts = [stdout, stderr];
  }
  const message: string = messageParts.join(EOL).trim();

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
    const configPath: string | undefined = await findMarkdownlintConfig();
    const outputPath: string = await writeTestsFile('markdownlint.txt', '');
    return await runMarkdownlint({
      configPath,
      outputPath,
      runner: npx,
    });
  },
);
