// All `Error`s in this package are required to contain a `cause` in this shape.
export default interface Cause {
  readonly data: unknown;
  readonly status: number;
}
