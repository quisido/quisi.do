import PuppeteerConnector from '@hint/connector-puppeteer';
import type { IConnector } from 'hint';
import { type Page } from 'puppeteer-core';

// Patch `PuppeteerConnector` to use the `off` method from v13.

Object.assign(PuppeteerConnector.default.prototype, {
  addListeners: function patchedAddListeners(
    this: PuppeteerConnector.default,
  ): void {
    // @ts-expect-error We must set a method that does not exist. 😭
    // eslint-disable-next-line no-underscore-dangle
    (this._page as Page).removeListener = function patchedRemoveListener(
      this: Page,
      ...args: Parameters<Page['off']>
    ): void {
      this.off(...args);
    };
  },
});

const PatchedPuppeteerConnector: IConnector =
  PuppeteerConnector.default as unknown as IConnector;

export default PatchedPuppeteerConnector;
