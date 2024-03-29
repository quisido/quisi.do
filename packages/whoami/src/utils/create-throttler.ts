export default function createThrottler(): (
  key: number | string | symbol,
  ms: number,
) => boolean {
  const map: Map<number | string | symbol, number> = new Map();
  return function throttle(key: number | string | symbol, ms: number): boolean {
    const lastCallTime: number | undefined = map.get(key);
    const now: number = Date.now();

    // Throttle if the last call time was less than `ms` ago.
    if (typeof lastCallTime !== 'undefined' && lastCallTime >= now - ms) {
      return true;
    }

    map.set(key, now);
    return false;
  };
}
