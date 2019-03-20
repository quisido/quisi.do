import stateVar from '../constants/state-var.js';
import type State from '../features/state.js';

export default function getState(): State {
  return stateVar.get();
}
