export default function mapThrottleErrorToLastCallTime(err: unknown): number {
  if (!(err instanceof Error)) {
    throw new Error('Expected throttling to cause an error.');
  }

  if (typeof err.cause !== 'number') {
    throw new Error('Expected a throttle error to contain a timestamp.');
  }

  return err.cause;
}
