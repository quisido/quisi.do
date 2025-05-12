/// <reference types="@cloudflare/workers-types" />
import { expect, vi } from 'vitest';

export default class TestR2Bucket implements R2Bucket {
  public readonly createMultipartUpload = vi.fn();
  public readonly delete = vi.fn();
  public readonly get = vi.fn();
  public readonly head = vi.fn();
  public readonly list = vi.fn();
  public readonly put = vi.fn();
  public readonly resumeMultipartUpload = vi.fn();

  public expectToHaveGot = (...params: Parameters<R2Bucket['get']>): void => {
    expect(this.get).toHaveBeenCalledWith(...params);
  };

  public expectToHavePut = (...params: Parameters<R2Bucket['put']>): void => {
    expect(this.put).toHaveBeenCalledWith(...params);
  };

  public setGetError = (error: Error): void => {
    this.get.mockRejectedValue(error);
  };

  public setPutError = (error: Error): void => {
    this.put.mockRejectedValue(error);
  };
}
