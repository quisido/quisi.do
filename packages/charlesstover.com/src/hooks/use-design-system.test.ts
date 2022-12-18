import { renderHook } from '@testing-library/react';
import useDesignSystem from './use-design-system';

describe('useDesignSystem', (): void => {
  it('should throw an error if the context is not provided', (): void => {
    expect((): void => {
      renderHook(useDesignSystem);
    }).toThrowError('Expected the design system context to be mounted.');
  });
});
