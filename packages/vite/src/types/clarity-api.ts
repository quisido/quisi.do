export default interface ClarityApi {
  (...args: readonly unknown[]): void;
  readonly q: IArguments[];
}
