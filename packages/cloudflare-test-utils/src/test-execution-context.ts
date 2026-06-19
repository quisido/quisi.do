/// <reference types="@cloudflare/workers-types" />
import { type Mock, vi } from 'vitest';

export const TEST_PASS_THROUGH_ON_EXCEPTION: Mock = vi.fn();
export const TEST_SPAN: Span = {
  end: vi.fn(),
  get isTraced(): boolean {
    return false;
  },
  setAttribute: vi.fn(),
};
export const TEST_SPAN_CONSTRUCTOR: typeof Span = vi.fn();
export const TEST_TRACING: Tracing = {
  enterSpan: <T, A extends unknown[]>(
    _name: string,
    callback: (span: Span, ...args: A) => T,
    ...args: A
  ): T => callback(TEST_SPAN, ...args),
  Span: TEST_SPAN_CONSTRUCTOR,
  startActiveSpan: <T, A extends unknown[]>(
    _name: string,
    callback: (span: Span, ...args: A) => T,
    ...args: A
  ): T => callback(TEST_SPAN, ...args),
};
export const TEST_WAIT_UNTIL: Mock = vi.fn();

export const TEST_EXECUTION_CONTEXT: ExecutionContext = {
  passThroughOnException: TEST_PASS_THROUGH_ON_EXCEPTION,
  props: null,
  tracing: TEST_TRACING,
  waitUntil: TEST_WAIT_UNTIL,
};
