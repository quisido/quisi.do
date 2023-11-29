/// <reference types="jest" />
import renderHookError from './render-hook-error';

function useTestHook(): null {
  return null;
}

describe('renderHookError', (): void => {
  it('should throw an error when the hook does not throw an error', (): void => {
    expect((): void => {
      renderHookError(useTestHook);
    }).toThrow();
  });
});
