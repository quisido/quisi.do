/// <reference types="@cloudflare/workers-types" />
import { describe, expect, it, vi } from 'vitest';
import { isD1Database } from "./index.js";

describe('isD1Database', (): void => {
  it('should identify D1 database interfaces', (): void => {
    expect(isD1Database(true)).toBe(false);
    expect(isD1Database(null)).toBe(false);
    expect(isD1Database({})).toBe(false);

    expect(isD1Database({
      batch: vi.fn(),
      dump: vi.fn(),
      exec: vi.fn(),
      prepare: vi.fn(),
    })).toBe(true);
  });
});
