import type { Config } from './config/config.js';
import type { Coverage } from './config/coverage.js';

interface Options extends Config {
  readonly onDebug?: ((message: string) => void) | undefined;
}

export default class Quisi {
  readonly #coverage: Coverage;
  // readonly #debug: (message: string) => void;

  public constructor({
    coverage = {},
    //  onDebug = noop
  }: Options) {
    this.#coverage = coverage;
    // this.#debug = onDebug;
  }

  public get coverage(): Coverage {
    return this.#coverage;
  }
}
