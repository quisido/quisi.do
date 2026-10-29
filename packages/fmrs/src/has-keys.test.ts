import { describe, expect, it } from 'vitest';
import { hasKeys } from './index.js';

describe('hasKeys', (): void => {
  it('should identify keys', (): void => {
    expect(hasKeys({}, ['ab'])).toBe(false);
    expect(hasKeys({ ab: 'cd' }, ['ab'])).toBe(true);
  });
});
