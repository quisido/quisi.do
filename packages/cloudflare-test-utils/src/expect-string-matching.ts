import { expect } from 'vitest';

export default function expectStringMatching(
  expected: RegExp | string,
): string {
  return expect.stringMatching(expected) as string;
}
