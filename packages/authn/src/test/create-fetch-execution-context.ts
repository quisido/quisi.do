import { vi } from 'vitest';

export default function createFetchExecutionContext(
  waitUntil: (promise: Promise<unknown>) => void,
): ExecutionContext {
  return {
    passThroughOnException: vi.fn(),
    waitUntil,
  };
}
