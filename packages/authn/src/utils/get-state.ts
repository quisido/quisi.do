import { STATE_VAR } from '../constants/state-var.js';
import type AuthnState from '../features/authn-state.js';

export default function getState(): AuthnState {
  return STATE_VAR.get();
}
