import { describe, expect, it } from 'vitest';
import handleNotFound from './handle-not-found.js';

describe('handleNotFound', (): void => {
  it('should throw an error', (): void => {
    expect((): void => {
      handleNotFound('test');
    }).toThrow();
  });
});
