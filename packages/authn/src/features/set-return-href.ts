import getState from '../utils/get-state.js';
import type State from './state.js';

export default function setReturnHref(): void {
  const state: State = getState();
  state.setReturnHref();
}
