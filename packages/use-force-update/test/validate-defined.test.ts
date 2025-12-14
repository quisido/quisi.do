import { describe, expect, it } from 'vitest';
import validateDefined from './validate-defined.js';

describe('validateDefined', (): void => {
  it('should throw when undefined', (): void => {
    expect((): void => {
      validateDefined(undefined);
    }).toThrowError();
  });
});
