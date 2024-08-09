import unimplementedMethod from "./unimplemented-method.js";

const DEFAULT_OPTIONS: Partial<R2Bucket> = {};

export default class TestR2Bucket implements R2Bucket {
  public put: R2Bucket['put'];

  public constructor({
    put = unimplementedMethod,
  }: Partial<R2Bucket> = DEFAULT_OPTIONS) {
    this.put = put;
  }

  public createMultipartUpload = unimplementedMethod;
  public delete = unimplementedMethod;
  public get = unimplementedMethod;
  public head = unimplementedMethod;
  public list = unimplementedMethod;
  public resumeMultipartUpload = unimplementedMethod;
}
