import PuppeteerConnector from '@hint/connector-puppeteer';
import type { IConnector } from 'hint';
import { type Page } from 'puppeteer-core';

// Patch `PuppeteerConnector` to use the `off` method from v13.

// eslint-disable-next-line func-style
function patchedRemoveListener(
  this: Page,
  ...args: Parameters<Page['off']>
): void {
  this.off(...args);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const unboundOriginalAddListeners: () => void =
  // @ts-expect-error We must access this private method to override it.
  PuppeteerConnector.default.prototype.addListeners;

Object.assign(PuppeteerConnector.default.prototype, {
  addListeners: function patchedAddListeners(
    this: PuppeteerConnector.default,
  ): void {
    // @ts-expect-error We must set a method that does not exist.
    // eslint-disable-next-line no-underscore-dangle
    (this._page as Page).removeListener = patchedRemoveListener;
    unboundOriginalAddListeners.apply(this);
  },
});

const PatchedPuppeteerConnector: IConnector =
  PuppeteerConnector.default as unknown as IConnector;

export default PatchedPuppeteerConnector;
