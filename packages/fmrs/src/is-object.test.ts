import { describe, expect, it } from 'vitest';
import { isObject } from './index.js';

describe('isObject', (): void => {
  it('should identify objects', (): void => {
    expect([{}, null, []].filter(isObject)).toEqual([{}, []]);
  });
});
