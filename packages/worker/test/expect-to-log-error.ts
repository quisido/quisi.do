import { TEST_CONSOLE_ERROR } from 'cloudflare-test-utils';
import { expect } from 'vitest';

export default function expectToLogError(...args: readonly unknown[]): void {
  expect(TEST_CONSOLE_ERROR).toHaveBeenCalledWith(...args);
}
