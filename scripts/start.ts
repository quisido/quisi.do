import concurrently, {
  type CloseEvent,
  type ConcurrentlyCommandInput,
} from 'concurrently';
import type { Dirent } from 'node:fs';
import getWorkspaceDirectories from './utils/get-workspace-directories.js';
import mapDirentToPackageJson from './utils/map-dirent-to-package-json.js';
import createPrefixColors from './utils/create-prefix-colors.js';

const workspaces = new Set<string>();

const workspaceDirectories: readonly Dirent[] = await getWorkspaceDirectories();
for (const workspaceDirectory of workspaceDirectories) {
  // eslint-disable-next-line no-await-in-loop
  const packageJson = await mapDirentToPackageJson(workspaceDirectory);
  if (packageJson.private === true) {
    continue;
  }

  if (typeof packageJson.scripts?.['start'] === 'undefined') {
    throw new Error(
      `Expected a start script for workspace: ${workspaceDirectory.name}`,
    );
  }

  workspaces.add(workspaceDirectory.name);
}

const mapWorkspaceToConcurrentlyCommandInput = (
  workspace: string,
): ConcurrentlyCommandInput => ({
  command: `npm start --workspace=packages/${workspace}`,
  name: workspace,
});

const { result } = concurrently(
  [...workspaces].map(mapWorkspaceToConcurrentlyCommandInput),
  {
    handleInput: false,
    killOthersOn: ['failure'],
    maxProcesses: '100%',
    padPrefix: true,
    prefix: '{name}',
    prefixColors: createPrefixColors(workspaces.size),
    restartDelay: 'exponential',
    restartTries: 3,
    successCondition: 'all',
    timings: false,
  },
);

const closeEvents: readonly CloseEvent[] = await result;

for (const {
  command: { command, name },
  exitCode,
  killed,
} of closeEvents) {
  if (exitCode === 0 || killed) {
    continue;
  }

  process.exitCode = exitCode;
  globalThis.console.error(`[${name}] Command failed: ${command}`);
}
