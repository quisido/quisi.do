import { describe, expect, it } from 'vitest';
import createNotImplementedThrower from './create-not-implemented-thrower.js';

describe('createNotImplementedThrower', (): void => {
  it('should throw', (): void => {
    const notImplementedMethod = createNotImplementedThrower('test');
    expect(notImplementedMethod).toThrow('`test` is not implemented.');
  });
});
