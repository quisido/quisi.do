interface ErrorResult {
  readonly duration: number;
  readonly error: unknown;
  readonly result: null;
}

interface SuccessResult<T> {
  readonly duration: number;
  readonly error: null;
  readonly result: T;
}

const MILLISECONDS_PER_SECOND = 1000;

export default async function withDuration<T>(
  callback: () => Promise<T>,
): Promise<ErrorResult | SuccessResult<T>> {
  const startTime: number = Date.now();

  const getDuration = (): number => {
    const endTime: number = Date.now();
    const durationMs: number = endTime - startTime;
    return Math.round(durationMs / MILLISECONDS_PER_SECOND);
  };

  try {
    const result: T = await callback();
    return {
      duration: getDuration(),
      error: null,
      result,
    };
  } catch (error: unknown) {
    return {
      duration: getDuration(),
      error,
      result: null,
    };
  }
}
