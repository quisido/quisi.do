import { describe, expect, it } from 'vitest';

import validateArray from './validate-array.js';

describe('validateArray', (): void => {
  it('should throw an error for non-arrays', (): void => {
    expect((): void => {
      validateArray(null);
    }).toThrow('Expected an array.');
  });
});
