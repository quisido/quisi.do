import { describe, expect, it } from 'vitest';
import { useAwsRum } from '../index.js';
import renderHookError from '../test/utils/render-hook-error.js';

describe('useAwsRum', (): void => {
  it('should throw an error when the AwsRum context is not provided', (): void => {
    const message: string = renderHookError(useAwsRum);
    expect(message).toBe('Expected the AWS RUM context to be provided.');
  });
});
