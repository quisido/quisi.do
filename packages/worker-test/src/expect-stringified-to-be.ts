import { expect } from 'vitest';

export default function expectStringifiedToBe(
  actual: string,
  expected: Record<string, boolean | number | string> | string,
): void {
  if (typeof expected === 'string') {
    expect(actual).toBe(expected);
    return;
  }

  expect(JSON.parse(actual)).toEqual(expected);
}
