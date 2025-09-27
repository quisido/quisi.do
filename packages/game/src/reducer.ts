import { type Actions } from './actions.js';
import reduceKeydown from './reducer/keydown.js';
import reduceKeyup from './reducer/keyup.js';
import type State from './state.js';

export default function reducer(
  state: State,
  { payload, type }: Actions,
): State {
  switch (type) {
    case 'keydown':
      return reduceKeydown(state, payload);

    case 'keyup':
      return reduceKeyup(state, payload);

    default:
      return state;
  }
}
