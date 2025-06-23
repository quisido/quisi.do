export default function retry<T>(attempts: number, fn: () => T): T {
  let attempt = 1;
  let lastError: unknown = null;

  do {
    try {
      return fn();
    } catch (err: unknown) {
      lastError = err;
    }
  } while (++attempt <= attempts);

  throw lastError;
}
