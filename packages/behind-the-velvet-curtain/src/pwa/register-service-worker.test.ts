import { describe, expect, it } from 'vitest';
import { isRegisterableServiceWorkerLocation } from './register-service-worker.js';

describe('isRegisterableServiceWorkerLocation', (): void => {
  it('rejects file URLs for Electron-friendly local bundles', (): void => {
    expect(
      isRegisterableServiceWorkerLocation({
        hostname: '',
        protocol: 'file:',
      }),
    ).toBe(false);
  });

  it('accepts localhost over http for development', (): void => {
    expect(
      isRegisterableServiceWorkerLocation({
        hostname: 'localhost',
        protocol: 'http:',
      }),
    ).toBe(true);
  });

  it('accepts secure hosted origins', (): void => {
    expect(
      isRegisterableServiceWorkerLocation({
        hostname: 'quisi.do',
        protocol: 'https:',
      }),
    ).toBe(true);
  });
});
