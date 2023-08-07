import renderHookError from '../test/utils/render-hook-error';
import useLanguage from './use-language';

describe('useLanguage', (): void => {
  it('should throw an error if the context is not provided', (): void => {
    const message: string = renderHookError(useLanguage);
    expect(message).toBe('Expected the language context to be provided.');
  });
});
