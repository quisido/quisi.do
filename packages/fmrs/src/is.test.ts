import { describe, expect, it } from 'vitest';
import { is } from './index.js';

describe('is', (): void => {
  it('should identify equality', (): void => {
    expect(['a', 'b', 'c'].filter(is('a'))).toEqual(['a']);
  });
});
