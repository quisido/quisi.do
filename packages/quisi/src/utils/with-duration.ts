const MILLISECONDS_PER_SECOND = 1000;

export default async function withDuration<T>(
  callback: () => Promise<T>,
): Promise<readonly [number, T]> {
  const startTime: number = Date.now();
  const result: T = await callback();
  const endTime: number = Date.now();
  const durationMs: number = endTime - startTime;
  const durationS: number = Math.round(durationMs / MILLISECONDS_PER_SECOND);
  return [durationS, result];
}
