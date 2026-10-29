import { describe, expect, it } from 'vitest';
import { isRecord } from './index.js';

describe('isRecord', (): void => {
  it('should identify objects', (): void => {
    expect([{}, null].filter(isRecord)).toEqual([{}]);
  });
});
