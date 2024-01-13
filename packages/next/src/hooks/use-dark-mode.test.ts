import renderHookError from '../test/utils/render-hook-error.js';
import useDarkMode from './use-dark-mode.js';

describe('useDarkMode', (): void => {
  it('should throw an error if the context is not provided', (): void => {
    const message: string = renderHookError(useDarkMode);
    expect(message).toBe('Expected the dark mode context to be provided.');
  });
});
