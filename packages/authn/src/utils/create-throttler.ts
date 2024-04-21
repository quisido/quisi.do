export default function createThrottler(): (
  key: number | string | symbol,
  ms: number,
) => void {
  const map: Map<number | string | symbol, number> =
    new Map<number | string | symbol, number>();

  return function throttle(key: number | string | symbol, ms: number): void {
    const lastCallTime: number | undefined = map.get(key);
    const now: number = Date.now();

    // Throttle if the last call time was less than `ms` ago.
    if (typeof lastCallTime !== 'undefined' && lastCallTime > now - ms) {
      throw new Error('Too many requests.', {
        cause: lastCallTime,
      });
    }

    map.set(key, now);
  };
}
