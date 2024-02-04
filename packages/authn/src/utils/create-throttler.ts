import StatusCode from '../constants/status-code.js';

export default function createThrottler(): (
  key: number | string | symbol,
  ms: number,
  assert: (
    assertion: boolean,
    message: string,
    status: StatusCode,
    data?: unknown,
  ) => asserts assertion,
) => void {
  const map: Map<number | string | symbol, number> = new Map();
  return function throttle(
    key: number | string | symbol,
    ms: number,
    assert: (
      assertion: boolean,
      message: string,
      status: StatusCode,
      data?: unknown,
    ) => asserts assertion,
  ): void {
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
