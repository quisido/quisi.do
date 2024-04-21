/// <reference types="jest" />
import useTestHook from '../hooks/use-test-hook.js';
import renderHookError from './render-hook-error.js';

describe('renderHookError', (): void => {
  it('should throw an error when the hook does not throw an error', (): void => {
    expect((): void => {
      renderHookError(useTestHook);
    }).toThrow();
  });
});
