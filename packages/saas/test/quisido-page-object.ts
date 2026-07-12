import type { Locator, Page } from '@playwright/test';

export default class QuisidoPageObject {
  #page: Page;

  public constructor(page: Page) {
    this.#page = page;
  }

  public getContentInfo(name: string): Locator {
    return this.#page.getByRole('contentinfo', { name });
  }

  public async goto(path: string): Promise<void> {
    await this.#page.goto(path);
  }
}
