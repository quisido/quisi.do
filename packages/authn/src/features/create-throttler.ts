import type AuthnFetchHandler from './authn-fetch-handler.js';

/**
 * TODO: Make each throttler static on the AuthnFetchHandler.
 */

export default function createThrottler(): (
  this: AuthnFetchHandler,
  key: number | string | symbol,
  ms: number,
) => void {
  const map: Map<number | string | symbol, number> = new Map<
    number | string | symbol,
    number
  >();

  return function throttle(
    this: AuthnFetchHandler,
    key: number | string | symbol,
    ms: number,
  ): void {
    const lastCallTime: number | undefined = map.get(key);
    const now: number = this.now();

    // Throttle if the last call time was less than `ms` ago.
    if (typeof lastCallTime !== 'undefined' && lastCallTime > now - ms) {
      throw new Error('Too many requests.', {
        cause: lastCallTime,
      });
    }

    map.set(key, now);
  };
}
