export default interface Stringifiable<T = unknown> {
  readonly toString: () => T;
}
