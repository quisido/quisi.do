import isCause from './is-cause.js';

export default function logError(err: unknown): void {
  // Unknown error
  if (!(err instanceof Error)) {
    console.error(`Caught ${typeof err}:`, err);
    return;
  }

  // Unknown cause
  const { cause, message } = err;
  if (!isCause(cause)) {
    console.error('Unknown cause:', message, cause);
    return;
  }

  // Known cause
  const { data, status } = cause;
  console.error(message, data, status);
}
