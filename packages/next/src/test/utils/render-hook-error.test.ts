import { describe, expect, it } from 'vitest';
import renderHookError from './render-hook-error.js';

const useTestHook = (): null => null;

describe('renderHookError', (): void => {
  it('should throw an error when the hook does not throw an error', (): void => {
    expect((): void => {
      renderHookError(useTestHook);
    }).toThrow();
  });
});
