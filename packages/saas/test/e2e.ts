import { test as base, type TestType } from '@playwright/test';
import QuisidoPageObject from './quisido-page-object.js';
import type { TestArgs, WorkerArgs } from './playwright.js';

export const test: TestType<TestArgs, WorkerArgs> = base.extend<
  TestArgs,
  WorkerArgs
>({
  quisido: async (
    { page }: TestArgs & WorkerArgs,
    use: (value: QuisidoPageObject) => Promise<void>,
  ): Promise<void> => {
    const po = new QuisidoPageObject(page);
    await use(po);
  },
});
