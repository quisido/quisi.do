import { renderHook } from '@testing-library/react';
import useDarkMode from './use-dark-mode';

describe('useDarkMode', (): void => {
  it('should throw an error if the context is not provided', (): void => {
    expect((): void => {
      renderHook(useDarkMode);
    }).toThrowError('Expected the dark mode context to be mounted.');
  });
});
