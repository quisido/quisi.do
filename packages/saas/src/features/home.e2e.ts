import { expect, type Locator } from '@playwright/test';
import { test } from '../../test/e2e.js';
import type { TestArgs, WorkerArgs } from '../../test/playwright.js';

test.describe('Home', (): void => {
  test('should show an About section', async ({
    quisido,
  }: TestArgs & WorkerArgs): Promise<void> => {
    await quisido.goto('/');
    const heading: Locator = quisido.getHeading('About');
    await expect(heading).toHaveAttribute('aria-level', '1');
  });

  test("should show this year's copyright", async ({
    quisido,
  }: TestArgs & WorkerArgs): Promise<void> => {
    const currentYear: number = new Date().getFullYear();

    await quisido.goto('/');
    quisido.getContentInfo(`&copy; ${currentYear} quisi.do`);
  });
});
