import type { Coverage } from './coverage.js';

export interface Config {
  readonly coverage?: Coverage | undefined;
}
