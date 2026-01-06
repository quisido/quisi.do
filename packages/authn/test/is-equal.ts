import { expect } from 'vitest';

export default function isEqual(actual: unknown, expected: unknown): boolean {
  try {
    expect(actual).toEqual(expected);
    return true;
  } catch (_err: unknown) {
    return false;
  }
}
