import {
  type PlaywrightTestArgs,
  type PlaywrightTestOptions,
  type PlaywrightWorkerArgs,
  type PlaywrightWorkerOptions,
  test as base,
  type TestType,
} from '@playwright/test';

import { type TestArgs, type WorkerArgs } from './playwright.js';
import QuisidoPageObject from './quisido-page-object.js';

export const test: TestType<TestArgs, WorkerArgs> = base.extend<
  TestArgs,
  WorkerArgs
>({
  quisido: async (
    {
      page,
    }: PlaywrightTestArgs &
      PlaywrightTestOptions &
      PlaywrightWorkerArgs &
      PlaywrightWorkerOptions,
    use: (value: QuisidoPageObject) => Promise<void>,
  ): Promise<void> => {
    const quisido = new QuisidoPageObject(page);
    await use(quisido);
  },
});
