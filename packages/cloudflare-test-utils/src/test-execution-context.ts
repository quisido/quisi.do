/// <reference types="@cloudflare/workers-types" />
import { type Mock, vi } from 'vitest';

export const TEST_PASS_THROUGH_ON_EXCEPTION: Mock = vi.fn();
export const TEST_WAIT_UNTIL: Mock = vi.fn();

export const TEST_EXECUTION_CONTEXT: ExecutionContext = {
  passThroughOnException: TEST_PASS_THROUGH_ON_EXCEPTION,
  props: null,
  waitUntil: TEST_WAIT_UNTIL,
};
