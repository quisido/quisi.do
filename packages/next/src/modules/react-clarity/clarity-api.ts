/**
 *   Due to Clarity needing to mount the Clarity API synchronously, this module
 * is replaced with a JavaScript string in `index.tsx`. This module exists here
 * solely for reference.
 */

const noop: VoidFunction = (): void => {
  // Do nothing.
};

const callee: IArguments['callee'] = (): VoidFunction => noop;

const mapArrayToArguments = (arr: readonly unknown[]): IArguments =>
  Object.assign(arr, {
    callee,
  });

export default class ClarityApi {
  public readonly q: IArguments[] = [];

  public readonly clarity = (...args: readonly unknown[]): void => {
    this.q.push(mapArrayToArguments(args));
  };
}
