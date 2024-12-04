import { describe, expect, it } from 'vitest';
import createTraceId from './create-trace-id.js';

// Warning: This is an unused feature. It remains here for coverage only.

describe('createTraceId', (): void => {
  it('should produce a trace ID', (): void => {
    expect(createTraceId()).toMatch(/^[0-9a-f]{32}/u);
  });
});
