import type { Runnable } from '@quisido/worker';

interface Options {
  readonly now?: (() => number) | undefined;
}

export default class Throttler<T extends number | string | symbol>
  implements Runnable<boolean, [T, number, Options?]>
{
  readonly #map = new Map<T, number>();

  public run = (
    input: T,
    limit: number,
    { now = Date.now.bind(Date) }: Options = {},
  ): boolean => {
    const currentCallTime: number = now();
    const lastCallTime: number | undefined = this.#map.get(input);
    if (
      typeof lastCallTime !== 'undefined' &&
      lastCallTime > currentCallTime - limit
    ) {
      return true;
    }

    this.#map.set(input, currentCallTime);
    return false;
  };
}
