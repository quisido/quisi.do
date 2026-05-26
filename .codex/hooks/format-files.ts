/* istanbul ignore file -- Codex executes this script as a lifecycle hook. */
import { spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ESLINT_CONFIG_FILE = 'eslint.config.ts';
const EXIT_CODE_FAILURE = 1;
const GIT_ROOT_ARGS: readonly string[] = ['rev-parse', '--show-toplevel'];
const HOOK_EVENT_NAME = 'PostToolUse';
let npmExecutable = 'npx';

if (process.platform === 'win32') {
  npmExecutable = 'npx.cmd';
}

const NPM_EXECUTABLE = npmExecutable;

const ESLINT_ARGS: readonly string[] = [
  '--no-install',
  'eslint',
  '--cache',
  '--cache-location',
  '.cache/eslint.json',
  '--color',
  '--config',
  ESLINT_CONFIG_FILE,
  '--exit-on-fatal-error',
  '--fix',
  '--max-warnings',
  '9999',
  '--no-config-lookup',
  '--report-unused-disable-directives-severity',
  'error',
  '--report-unused-inline-configs',
  'error',
];

const ESLINT_FORMATTABLE_EXTENSIONS: ReadonlySet<string> = new Set([
  '.cjs',
  '.js',
  '.json',
  '.jsonc',
  '.jsx',
  '.mjs',
  '.ts',
  '.tsx',
  '.webmanifest',
]);

interface CodexHookInput {
  readonly tool_input?: {
    readonly command?: unknown;
  };
}

interface CommandResult {
  readonly status: number;
  readonly stderr: string;
  readonly stdout: string;
}

const isPathInsideRoot = (rootPath: string, absolutePath: string): boolean => {
  const relativePath: string = relative(rootPath, absolutePath);
  return (
    relativePath === '' ||
    (!relativePath.startsWith('..') && !relativePath.startsWith(sep))
  );
};

const normalizePatchPath = (path: string): string => {
  return path.trim();
};

export const extractChangedFilePaths = (command: string): readonly string[] => {
  const paths = new Set<string>();

  for (const line of command.split('\n')) {
    const changedFileMatch: RegExpExecArray | null =
      /^\*\*\* (?:Add|Update) File: (?<path>.+)$/u.exec(line);
    const movedFileMatch: RegExpExecArray | null =
      /^\*\*\* Move to: (?<path>.+)$/u.exec(line);
    const match: RegExpExecArray | null = changedFileMatch ?? movedFileMatch;

    if (match?.groups?.path !== undefined) {
      paths.add(normalizePatchPath(match.groups.path));
    }
  }

  return [...paths].filter(path => path !== '');
};

export const isEslintFormattablePath = (path: string): boolean => {
  return ESLINT_FORMATTABLE_EXTENSIONS.has(extname(path));
};

export const mapPathsToExistingFormattablePaths = (
  rootPath: string,
  paths: readonly string[],
): readonly string[] => {
  return paths.filter((path: string): boolean => {
    const absolutePath: string = resolve(rootPath, path);

    return (
      isPathInsideRoot(rootPath, absolutePath) &&
      existsSync(absolutePath) &&
      isEslintFormattablePath(path)
    );
  });
};

const findEslintConfigDirectory = (
  rootPath: string,
  filePath: string,
): string | null => {
  let currentPath: string = dirname(resolve(rootPath, filePath));

  while (isPathInsideRoot(rootPath, currentPath)) {
    if (existsSync(resolve(currentPath, ESLINT_CONFIG_FILE))) {
      return currentPath;
    }

    const parentPath: string = dirname(currentPath);
    if (parentPath === currentPath) {
      return null;
    }

    currentPath = parentPath;
  }

  return null;
};

const groupPathsByConfigDirectory = (
  rootPath: string,
  paths: readonly string[],
): ReadonlyMap<string, readonly string[]> => {
  const groups = new Map<string, string[]>();

  for (const path of paths) {
    const configDirectory: string | null = findEslintConfigDirectory(
      rootPath,
      path,
    );

    if (configDirectory !== null) {
      const group: string[] = groups.get(configDirectory) ?? [];
      group.push(relative(configDirectory, resolve(rootPath, path)));
      groups.set(configDirectory, group);
    }
  }

  return groups;
};

const mapSpawnResultToCommandResult = (
  result: SpawnSyncReturns<string>,
): CommandResult => {
  return {
    status: result.status ?? EXIT_CODE_FAILURE,
    stderr: result.stderr,
    stdout: result.stdout,
  };
};

const runCommand = (
  command: string,
  args: readonly string[],
  cwd: string,
): CommandResult => {
  return mapSpawnResultToCommandResult(
    spawnSync(command, args, {
      cwd,
      encoding: 'utf8',
      env: {
        ...process.env,
        NODE_OPTIONS: '--disable-warning=ESLintPoorConcurrencyWarning',
      },
    }),
  );
};

const readStdin = (): Promise<string> => {
  return new Promise((resolvePromise, reject): void => {
    let input = '';

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk: string): void => {
      input += chunk;
    });
    process.stdin.on('end', (): void => {
      resolvePromise(input);
    });
    process.stdin.on('error', reject);
  });
};

const parseHookInput = (input: string): CodexHookInput => {
  if (input.trim() === '') {
    return {};
  }

  return JSON.parse(input) as CodexHookInput;
};

const writeHookFailure = (message: string): void => {
  process.stdout.write(
    `${JSON.stringify({
      decision: 'block',
      hookSpecificOutput: {
        hookEventName: HOOK_EVENT_NAME,
      },
      reason: message,
    })}\n`,
  );
};

const writeSystemMessage = (message: string): void => {
  process.stdout.write(
    `${JSON.stringify({
      systemMessage: message,
    })}\n`,
  );
};

const getGitRoot = (): string => {
  const result: CommandResult = runCommand('git', GIT_ROOT_ARGS, process.cwd());

  if (result.status !== 0) {
    throw new Error(`Unable to locate git root.\n${result.stderr}`.trim());
  }

  return result.stdout.trim();
};

const runEslint = (rootPath: string, paths: readonly string[]): void => {
  const groups: ReadonlyMap<string, readonly string[]> =
    groupPathsByConfigDirectory(rootPath, paths);

  for (const [cwd, groupPaths] of groups) {
    const result: CommandResult = runCommand(
      NPM_EXECUTABLE,
      [...ESLINT_ARGS, ...groupPaths],
      cwd,
    );

    if (result.status !== 0) {
      throw new Error([result.stderr, result.stdout].join('\n').trim());
    }
  }
};

export const main = async (): Promise<void> => {
  const hookInput: CodexHookInput = parseHookInput(await readStdin());
  const command: unknown = hookInput.tool_input?.command;

  if (typeof command !== 'string') {
    return;
  }

  const rootPath: string = getGitRoot();
  const paths: readonly string[] = mapPathsToExistingFormattablePaths(
    rootPath,
    extractChangedFilePaths(command),
  );

  if (paths.length === 0) {
    return;
  }

  runEslint(rootPath, paths);
  writeSystemMessage(`Formatted ${paths.length} Codex-edited file(s).`);
};

const isCli: boolean = process.argv[1] === fileURLToPath(import.meta.url);

if (isCli) {
  try {
    await main();
  } catch (error: unknown) {
    let message: string = String(error);
    if (error instanceof Error) {
      message = error.message;
    }

    writeHookFailure(message);
  }
}
