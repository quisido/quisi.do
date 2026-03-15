import { describe, expect, it } from 'vitest';
import { isNot, isNotEqualTo } from './index.js';

describe('isNot', (): void => {
  it('should identify negation', (): void => {
    expect(['a', 'b', 'c'].filter(isNot('a'))).toEqual(['b', 'c']);
    expect(['a', 'b', 'c'].filter(isNotEqualTo('a'))).toEqual(['b', 'c']);
  });
});
