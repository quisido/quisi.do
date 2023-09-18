export default interface Runnable<R, A extends unknown[]> {
  run: (...args: A) => R;
}
