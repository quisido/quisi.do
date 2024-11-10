import { expect } from 'vitest';
import { TEST_CONSOLE_ERROR } from './console.js';

export default function expectToLogError(...args: readonly unknown[]): void {
  expect(TEST_CONSOLE_ERROR).toHaveBeenCalledWith(...args);
}
