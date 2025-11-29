/// <reference types="@cloudflare/workers-types" />
import { expect, type Mock, vi } from 'vitest';

export default class TestR2Bucket implements R2Bucket {
  public readonly createMultipartUpload: Mock = vi.fn();
  public readonly delete: Mock = vi.fn();
  public readonly get: Mock = vi.fn();
  public readonly head: Mock = vi.fn();
  public readonly list: Mock = vi.fn();
  public readonly put: Mock = vi.fn();
  public readonly resumeMultipartUpload: Mock = vi.fn();

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
