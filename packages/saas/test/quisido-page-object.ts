import type { Locator, Page } from '@playwright/test';

export default class QuisidoPageObject {
  readonly #page: Page;

  public constructor(page: Page) {
    this.#page = page;
  }

  public async appendArticles(feedName: string): Promise<void> {
    await this.getFeed(feedName)
      .getByRole('article', { exact: true, name: 'Append articles' })
      .click();
  }

  public async checkCheckbox(name: string): Promise<void> {
    await this.getCheckbox(name).check();
  }

  public async checkSwitch(name: string): Promise<void> {
    await this.getSwitch(name).check();
  }

  public async clickButton(name: string): Promise<void> {
    await this.getButton(name).click();
  }

  public async clickLink(text: string): Promise<void> {
    await this.getLink(text).click();
  }

  public async decrementSpinButton(name: string): Promise<void> {
    await this.getSpinButton(name).press('ArrowDown');
  }

  public async dismissAlertDialog(name: string): Promise<void> {
    await this.getAlertDialog(name)
      .getByRole('button', { exact: true, name: 'Dismiss' })
      .click();
  }

  public async dismissDialog(name: string): Promise<void> {
    await this.getDialog(name)
      .getByRole('button', { exact: true, name: 'Close' })
      .click();
  }

  public async expandCombobox(name: string): Promise<void> {
    await this.getCombobox(name).click();
  }

  public getAlert(name: string): Locator {
    return this.#page.getByRole('alert', { exact: true, name });
  }

  public getAlertDialog(name: string): Locator {
    return this.#page.getByRole('alertdialog', { exact: true, name });
  }

  public getApplication(name: string): Locator {
    return this.#page.getByRole('application', { exact: true, name });
  }

  public getArticle(name: string): Locator {
    return this.#page.getByRole('article', { exact: true, name });
  }

  public getButton(name: string): Locator {
    return this.#page.getByRole('button', { exact: true, name });
  }

  public getCheckbox(name: string): Locator {
    return this.#page.getByRole('checkbox', { exact: true, name });
  }

  public getCombobox(name: string): Locator {
    return this.#page.getByRole('combobox', { exact: true, name });
  }

  public getContentInfo(name: string): Locator {
    return this.#page.getByRole('contentinfo', { exact: true, name });
  }

  public getDialog(name: string): Locator {
    return this.#page.getByRole('dialog', { exact: true, name });
  }

  public getFeed(name: string): Locator {
    return this.#page.getByRole('feed', { exact: true, name });
  }

  public getFigure(caption: string): Locator {
    return this.#page.getByRole('figure', { exact: true, name: caption });
  }

  public getForm(name: string): Locator {
    return this.#page.getByRole('form', { exact: true, name });
  }

  public getGrid(name: string): Locator {
    return this.#page.getByRole('grid', { exact: true, name });
  }

  public getHeading(name: string): Locator {
    return this.#page.getByRole('heading', { exact: true, name });
  }

  public getImage(alt: string): Locator {
    return this.#page.getByRole('img', { exact: true, name: alt });
  }

  public getLink(text: string): Locator {
    return this.#page.getByRole('link', { exact: true, name: text });
  }

  public getList(name: string): Locator {
    return this.#page.getByRole('list', { exact: true, name });
  }

  public getListBox(name: string): Locator {
    return this.#page.getByRole('listbox', { exact: true, name });
  }

  public getNavigation(name: string): Locator {
    return this.#page.getByRole('navigation', { exact: true, name });
  }

  public getRadioGroup(name: string): Locator {
    return this.#page.getByRole('radiogroup', { exact: true, name });
  }

  public getRegion(name: string): Locator {
    return this.#page.getByRole('region', { exact: true, name });
  }

  public getSearchBox(name: string): Locator {
    return this.#page.getByRole('searchbox', { exact: true, name });
  }

  public getSlider(name: string): Locator {
    return this.#page.getByRole('slider', { exact: true, name });
  }

  public getSpinButton(name: string): Locator {
    return this.#page.getByRole('spinbutton', { exact: true, name });
  }

  public getSwitch(name: string): Locator {
    return this.#page.getByRole('switch', { exact: true, name });
  }

  public getTable(name: string): Locator {
    return this.#page.getByRole('table', { exact: true, name });
  }

  public async goto(path: string): Promise<void> {
    await this.#page.goto(path);
  }

  public async incrementSpinButton(name: string): Promise<void> {
    await this.getSpinButton(name).press('ArrowUp');
  }

  public async prependArticles(feedName: string): Promise<void> {
    await this.getFeed(feedName)
      .getByRole('article', { exact: true, name: 'Preppend articles' })
      .click();
  }

  public async uncheckCheckbox(name: string): Promise<void> {
    await this.getCheckbox(name).uncheck();
  }

  public async uncheckSwitch(name: string): Promise<void> {
    await this.getSwitch(name).uncheck();
  }
}
