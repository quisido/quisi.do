import { Variable } from 'proposal-async-context/src/index.js';

interface Options {
  readonly name: string;
}

export default class RequiredVariable<T> extends Variable<T> {
  public constructor({ name }: Options) {
    super({ name });
  }

  public override get(): T {
    const value: T | undefined = super.get();
    if (typeof value === 'undefined') {
      throw new Error(`Variable "${this.name}" is not defined.`);
    }
    return value;
  }
}
