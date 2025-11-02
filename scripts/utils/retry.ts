/* eslint-disable no-console */

export default function retry<T>(attempts: number, fn: () => T): T {
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return fn();
    } catch (err: unknown) {
      lastError = err;
    }
    if (attempt === attempts) {
      console.log(`Attempt ${attempt} failed.`);
    } else {
      console.log(`Attempt ${attempt} failed. Retrying...`);
    }
  }

  throw lastError;
}
