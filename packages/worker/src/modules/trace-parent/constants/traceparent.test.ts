import { assert, describe, expect, it } from 'vitest';
import type { TraceParentGroups } from '../types/trace-parent-groups.js';
import { TRACEPARENT } from './traceparent.js';

describe('TRACEPARENT', (): void => {
  it('should return trace parent groups', (): void => {
    const result: RegExpExecArray | null = TRACEPARENT.exec(
      '01-23456789abcdef0123456789abcdef01-23456789abcdef01-23',
    );

    assert(result !== null);

    const { groups } = result;
    expect(groups).toEqual({
      parentId: '23456789abcdef01',
      traceFlags: '23',
      traceId: '23456789abcdef0123456789abcdef01',
      version: '01',
    } satisfies TraceParentGroups);
  });

  it('should reject invalid versions', (): void => {
    const result: RegExpExecArray | null = TRACEPARENT.exec(
      '01-23456789abcdef01-23456789-ab',
    );

    expect(result).toBe(null);
  });
});
