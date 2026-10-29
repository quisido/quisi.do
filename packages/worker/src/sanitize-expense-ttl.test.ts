import { describe, expect, it } from 'vitest';
import sanitizeExpenseTtl from './sanitize-expense-ttl.js';
import { SECONDS_PER_YEAR } from './time.js';

describe('sanitizeExpenseTtl', (): void => {
  it('should return one year when TTL is 0', (): void => {
    expect(sanitizeExpenseTtl(0)).toBe(SECONDS_PER_YEAR);
  });

  it('should return non-zero TTLs', (): void => {
    const ttl = 1234;
    expect(sanitizeExpenseTtl(ttl)).toBe(ttl);
  });
});
