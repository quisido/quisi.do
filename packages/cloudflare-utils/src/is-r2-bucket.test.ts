/// <reference types="@cloudflare/workers-types" />
import { describe, expect, it, vi } from 'vitest';
import { isR2Bucket } from "./index.js";

describe('isR2Bucket', (): void => {
  it('should identify R2 bucket interfaces', (): void => {
    expect(isR2Bucket(true)).toBe(false);
    expect(isR2Bucket(null)).toBe(false);
    expect(isR2Bucket({})).toBe(false);

    expect(isR2Bucket({
      createMultipartUpload: vi.fn(),
      delete: vi.fn(),
      get: vi.fn(),
      head: vi.fn(),
      list: vi.fn(),
      put: vi.fn(),
      resumeMultipartUpload: vi.fn(),
    })).toBe(true);
  });
});
