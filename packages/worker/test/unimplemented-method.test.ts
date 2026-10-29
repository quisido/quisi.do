import { describe, expect, it } from 'vitest';
import unimplementedMethod from './unimplemented-method.js';

describe('unimplementedMethod', (): void => {
  it('should throw', (): void => {
    expect(unimplementedMethod).toThrow('Method not implemented');
  });
});
