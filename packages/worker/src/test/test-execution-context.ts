import { vi } from 'vitest';

export const TEST_WAIT_UNTIL = vi.fn();

export const TEST_EXECUTION_CONTEXT: ExecutionContext = {
  passThroughOnException: vi.fn(),
  waitUntil: TEST_WAIT_UNTIL,
};
