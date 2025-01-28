import { describe, expect, it } from 'vitest';
import mapValueToDependencies from './map-value-to-dependencies.js';

const TEST_NUMBER = 1234;

describe('mapValueToDependencies', (): void => {
  it('should support primitives', (): void => {
    expect(mapValueToDependencies(true)).toEqual([true]);
    expect(mapValueToDependencies(null)).toEqual([null]);
    expect(mapValueToDependencies(TEST_NUMBER)).toEqual([TEST_NUMBER]);
    expect(mapValueToDependencies('test string')).toEqual(['test string']);
    expect(mapValueToDependencies(undefined)).toEqual([undefined]);
  });
});
