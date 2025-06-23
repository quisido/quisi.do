import { describe, expect, it } from 'vitest';
import isPromise from './is-promise.js';

describe('isPromise', (): void => {
  it('should return true for a Promise', (): void => {
    expect(isPromise(Promise.resolve())).toBe(true);
  });

  it('should return false for a non-Promise value', (): void => {
    expect(isPromise('string')).toBe(false);
    expect(isPromise({})).toBe(false);
    expect(isPromise([])).toBe(false);
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
  });
});
