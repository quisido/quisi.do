import { describe, expect, it, vi } from 'vitest';
import { TEST_EXECUTION_CONTEXT, TEST_SPAN } from './index.js';

describe('TEST_EXECUTION_CONTEXT', (): void => {
  it('should start with the test span', (): void => {
    expect(TEST_EXECUTION_CONTEXT.tracing.startSpan('test')).toBe(TEST_SPAN);
  });

  it('should enter spans with the test span', (): void => {
    const result = TEST_EXECUTION_CONTEXT.tracing.enterSpan(
      'test',
      (span: Span, value: string): string => {
        expect(span).toBe(TEST_SPAN);
        return value;
      },
      'result',
    );

    expect(result).toBe('result');
  });

  it('should forward arguments and return the callback result with an active span', (): void => {
    const expectedResult = { value: 'result' };
    const callback = vi.fn((_value: string, _count: number) => expectedResult);

    const result = TEST_EXECUTION_CONTEXT.tracing.withActiveSpan(
      TEST_SPAN,
      callback,
      'value',
      2,
    );

    expect(callback).toHaveBeenCalledExactlyOnceWith('value', 2);
    expect(result).toBe(expectedResult);
  });

  it('should return the callback promise with an active span', async (): Promise<void> => {
    const expectedResult = Promise.resolve('result');

    const result = TEST_EXECUTION_CONTEXT.tracing.withActiveSpan(
      TEST_SPAN,
      () => expectedResult,
    );

    expect(result).toBe(expectedResult);
    await expect(result).resolves.toBe('result');
  });

  it('should propagate callback errors with an active span', (): void => {
    const error = new Error('Test tracing callback failed.');

    expect(() =>
      TEST_EXECUTION_CONTEXT.tracing.withActiveSpan(TEST_SPAN, () => {
        throw error;
      }),
    ).toThrow(error);
  });
});
