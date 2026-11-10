import { describe, expect, it } from 'vitest';
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

  it('forwards callback arguments and preserves the result with an active span', (): void => {
    const expected = Promise.resolve('result');
    const callback = (value: string, count: number): Promise<string> => {
      expect(value).toBe('value');
      expect(count).toBe(2);
      return expected;
    };

    const result = TEST_EXECUTION_CONTEXT.tracing.withActiveSpan(
      TEST_SPAN,
      callback,
      'value',
      2,
    );

    expect(result).toBe(expected);
  });

  it('propagates callback errors with an active span', (): void => {
    const error = new Error('Test tracing callback failed');
    const callback = (): never => {
      throw error;
    };

    expect(() =>
      TEST_EXECUTION_CONTEXT.tracing.withActiveSpan(TEST_SPAN, callback),
    ).toThrow(error);
  });
});
