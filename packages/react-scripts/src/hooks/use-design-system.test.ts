import renderHookError from '../test/utils/render-hook-error';
import useDesignSystem from './use-design-system';

describe('useDesignSystem', (): void => {
  it('should throw an error if the context is not provided', (): void => {
    const message: string = renderHookError(useDesignSystem);
    expect(message).toBe('Expected the design system context to be provided.');
  });
});
