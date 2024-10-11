import { expect } from 'vitest';
import { EXPECT_ANY_STRING } from './expect-any.js';
import { TEST_CONSOLE_ERROR } from './test-console.js';

export default function expectPrivateLog(err: Error): void {
  expect(TEST_CONSOLE_ERROR).toHaveBeenCalledWith(
    'Private:',
    err.message,
    err.cause,
    EXPECT_ANY_STRING,
  );
}
