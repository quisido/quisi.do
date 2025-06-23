import { describe, expect, it } from 'vitest';
import noop from './noop.js';

describe('noop', (): void => {
  it('should do nothing', (): void => {
    expect(noop).not.toThrow();
  });
});
