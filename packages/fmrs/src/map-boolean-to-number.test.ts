import { describe, expect, it } from 'vitest';
import { mapBooleanToNumber } from './index.js';

const FALSE = 0;
const TRUE = 1;

describe('mapBooleanToNumber', (): void => {
  it('should support true and false', (): void => {
    expect(mapBooleanToNumber(true)).toBe(TRUE);
    expect(mapBooleanToNumber(false)).toBe(FALSE);
  });
});
