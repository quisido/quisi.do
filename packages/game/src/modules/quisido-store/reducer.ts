import type { Stringifiable } from './stringifiable.js';

export type Reducer<State extends Stringifiable, Action> = (
  state: State,
  action: Action,
) => State;
