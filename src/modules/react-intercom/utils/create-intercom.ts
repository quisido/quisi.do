import type IntercomFunction from '../types/intercom-function';

export default function createIntercomFunction(): IntercomFunction {
  const intercomFunction: IntercomFunction = function WindowIntercom(
    ...args: readonly unknown[]
  ): void {
    intercomFunction.c(args);
  };

  // Method `c` and property `q` are defined by Intercom.
  intercomFunction.c = function WindowIntercomC(
    args: readonly unknown[],
  ): void {
    intercomFunction.q.push(args);
  };

  intercomFunction.q = [];

  return intercomFunction;
}
