import type { Actions } from './index.js';
import type { Stringifiable } from './stringifiable.js';

export type Reducer<State extends Stringifiable> = <K extends keyof Actions>(
  state: State,
  action: K,
  payload: Actions[K],
) => unknown;
