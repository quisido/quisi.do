export default interface Runnable<R = void, A extends readonly unknown[] = []> {
  readonly run: (...args: A) => R;
}
