import { vi } from 'vitest';

export default class TestR2Bucket implements R2Bucket {
  public readonly createMultipartUpload = vi.fn();
  public readonly delete = vi.fn();
  public readonly get = vi.fn();
  public readonly head = vi.fn();
  public readonly list = vi.fn();
  public readonly put = vi.fn();
  public readonly resumeMultipartUpload = vi.fn();
}
