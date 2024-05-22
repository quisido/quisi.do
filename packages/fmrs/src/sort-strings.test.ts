import { describe, expect, it } from 'vitest';
import sortStrings from './sort-strings.js';

describe('sortStrings', (): void => {
  it('should sort strings', (): void => {
    expect(['b', 'd', 'e', 'c', 'a'].sort(sortStrings)).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e',
    ]);
  });
});
