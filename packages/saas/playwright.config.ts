import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from '@playwright/test';
import type { TestArgs, WorkerArgs } from './test/playwright.js';
import { cpus } from 'node:os';
import process from 'node:process';

const {
  BASE_URL = 'http://localhost:3000',
  CI = 'false',
  COLOR_SCHEME = 'light',
  ENVIRONMENT = 'local',
} = process.env;

const CPU_COUNT: number = cpus().length;
const IS_CI: boolean = CI !== 'false';

const COLOR_SCHEMES = new Set<unknown>(['dark', 'light']);
const isColorScheme = (value: unknown): value is 'dark' | 'light' =>
  COLOR_SCHEMES.has(value);

if (!isColorScheme(COLOR_SCHEME)) {
  throw new Error(`Invalid color scheme: ${COLOR_SCHEME}`);
}

const CONFIG: PlaywrightTestConfig<TestArgs, WorkerArgs> = defineConfig<
  TestArgs,
  WorkerArgs
>({
  captureGitInfo: {
    commit: true,
    diff: true,
  },
  failOnFlakyTests: true,
  forbidOnly: IS_CI,
  fullyParallel: true,
  maxFailures: 0,
  metadata: {
    baseUrl: BASE_URL,
    ci: IS_CI,
    cpuCount: CPU_COUNT,
  },
  name: 'Playwright',
  outputDir: '.tests/playwright/output',
  preserveOutput: 'always',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  quiet: false,
  repeatEach: 0,
  reporter: [
    ['blob', { fileName: 'blob.zip', outputDir: '.tests/playwright' }],
    ['dot'],
    ['github'],
    [
      'html',
      {
        attachmentsBaseURL: BASE_URL,
        doNotInlineAssets: false,
        noCopyPrompt: false,
        noSnippets: false,
        open: 'never',
        outputFolder: '.tests/playwright/html',
      },
    ],
    ['json', { outputFile: '.tests/playwright/report.json' }],
    [
      'junit',
      {
        includeProjectInTestName: true,
        includeRetries: true,
        outputFile: '.tests/playwright/junit.xml',
        stripANSIControlSequences: true,
      },
    ],
    ['line'],
    ['list', { printFailuresInline: true, printSteps: true }],
    ['null'],
  ],
  reportSlowTests: {
    max: 5,
    threshold: 300_000,
  },
  respectGitIgnore: true,
  retries: 0,
  shard: {
    current: 1,
    total: 1,
  },
  snapshotDir: '.tests/playwright/snapshots',
  tag: [`@${ENVIRONMENT}`],
  testDir: 'src/',
  testMatch: /.+\.e2e\.ts$/u,
  timeout: 30_000,
  use: {
    baseURL: BASE_URL,
    colorScheme: COLOR_SCHEME,
    locale: 'en-US',
    trace: 'on-first-retry',
  },
  /*
  This is only beneficial for localhost, but we want our configuration to
  support deployed environments too.
  webServer: {
    command: 'npm run start',
    reuseExistingServer: !IS_CI,
    url: BASE_URL,
  },
  */
  workers: '50%',
});

export default CONFIG;
