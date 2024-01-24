import StatusCode from '../constants/status-code.js';
import assert from './assert.js';

export default function createThrottler(): (
  key: number | string | symbol,
  ms: number,
) => void {
  const map: Map<number | string | symbol, number> = new Map();
  return function throttle(key: number | string | symbol, ms: number): void {
    const lastCallTime: number | undefined = map.get(key);
    const now: number = Date.now();

    // Throttle if the last call time was less than `ms` ago.
    assert(
      typeof lastCallTime === 'undefined' || lastCallTime < now - ms,
      'Too many requests.',
      StatusCode.TooManyRequests,
      {
        key,
        value: lastCallTime,
      },
    );

    map.set(key, now);
  };
}
