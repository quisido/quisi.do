import { describe, expect, it } from 'vitest';
import { TEST_EXECUTION_CONTEXT, TEST_SPAN } from './test-execution-context.js';

describe('TEST_EXECUTION_CONTEXT', (): void => {
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
});
