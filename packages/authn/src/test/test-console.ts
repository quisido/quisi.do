import { vi } from 'vitest';

export const TEST_CONSOLE_ERROR = vi.fn(console.error);
export const TEST_CONSOLE_LOG = vi.fn();
export const TEST_CONSOLE_WARN = vi.fn();

export const TEST_CONSOLE: Console = {
  ...console,
  error: TEST_CONSOLE_ERROR,
  log: TEST_CONSOLE_LOG,
  warn: TEST_CONSOLE_WARN,
};
