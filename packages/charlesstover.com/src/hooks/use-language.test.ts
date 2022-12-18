import { renderHook } from '@testing-library/react';
import useLanguage from './use-language';

describe('useLanguage', (): void => {
  it('should throw an error if the context is not provided', (): void => {
    expect((): void => {
      renderHook(useLanguage);
    }).toThrowError('Expected the language context to be mounted.');
  });
});
